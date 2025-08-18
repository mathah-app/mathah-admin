import { updateDriver } from "@/backend/admin";

export const activateDriver = async (router: any, id: string, phone: any, message:string) => {
  try {
    await updateDriver(id, { status: "active" });
    const res = await fetch('/api/sendtext', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
        message:
          message,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send text message");
    }
    router.refresh();
  } catch (e) {
    console.error("Error suspending driver:", e);
  }
};

export const suspendDriver = async (router: any, id: string, phone: any, message:string) => {
  try {
    await updateDriver(id, { status: "suspended" });
    const res = await fetch('/api/sendtext', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
        message:message
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send text message");
    }
    router.refresh();
  } catch (e) {
    console.error("Error suspending driver:", e);
  }
};
