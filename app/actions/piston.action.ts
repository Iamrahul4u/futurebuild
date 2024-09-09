"use server";

export default async function sendCode(
  code: string,
  language: string,
  version: string,
  fileName: string,
) {
  console.log("got the request");
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [{ name: fileName, content: code }],
        stdin: "1 2",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
}
