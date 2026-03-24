import Anthropic from "@anthropic-ai/sdk";
import { accountants, SERVICE_LABELS, BUSINESS_TYPE_LABELS, TURNOVER_LABELS, FEE_LABELS, MEETING_LABELS } from "@/lib/accountants";
import { NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: Request) {
  try {
    const { freeText, accountantId } = await req.json();

    if (!freeText || !accountantId) {
      return NextResponse.json({ error: "Missing freeText or accountantId" }, { status: 400 });
    }

    const accountant = accountants.find((a) => a.id === accountantId);
    if (!accountant) {
      return NextResponse.json({ error: "Accountant not found" }, { status: 404 });
    }

    const servicesList = accountant.services.map((s) => SERVICE_LABELS[s]).join(", ");
    const businessTypesList = accountant.businessTypes.map((b) => BUSINESS_TYPE_LABELS[b]).join(", ");
    const turnoverList = accountant.turnoverRanges.map((t) => TURNOVER_LABELS[t]).join(", ");

    const prompt = `You are an expert accountant matchmaker. A business owner has described their situation, and you need to assess how well a specific accountant would suit them.

BUSINESS OWNER'S SITUATION:
"${freeText}"

ACCOUNTANT PROFILE:
Name: ${accountant.name}
Firm: ${accountant.firm}
Location: ${accountant.city}
Qualification: ${accountant.qualification} (${accountant.yearsExperience} years experience)
Services: ${servicesList}
Business types served: ${businessTypesList}
Turnover ranges: ${turnoverList}
Fee structure: ${FEE_LABELS[accountant.feeStructure]}
Meeting style: ${MEETING_LABELS[accountant.meetingPreference]}
Welsh speaker: ${accountant.welshSpeaker ? "Yes" : "No"}
Bio: ${accountant.bio}

Based on the business owner's specific situation, score how well this accountant suits them out of 30. Consider any specific needs, challenges, or context mentioned that the rule-based matching might miss.

Respond in this exact JSON format (no other text):
{"score": <integer 0-30>, "explanation": "<one concise sentence explaining the key reason for this score>"}`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text.trim() : "";
    const parsed = JSON.parse(text);

    const score = Math.min(30, Math.max(0, Math.round(Number(parsed.score))));
    const explanation = String(parsed.explanation);

    return NextResponse.json({ score, explanation });
  } catch {
    return NextResponse.json({ score: 0, explanation: "AI review unavailable." });
  }
}
