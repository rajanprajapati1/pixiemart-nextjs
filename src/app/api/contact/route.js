import { Form } from "@/tools/models/ContactForm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { formData } = await req.json();
    const { category, name, email, message } = formData;

    const payload = {
      name: name,
      Issue: category,
      email: email,
      message: message,
    };

    const form = await Form.create(payload);
    return NextResponse.json({
      msg: "Successfully Form Added",
      res: "We Review Your Issue in Incoming Days",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Failed to Add FORM",
      error: error,
      success: false,
    });
  }
}
