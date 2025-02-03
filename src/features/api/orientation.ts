const API_URL = "http://mon-projet-fastapi.onrender.com/predict/";
export async function NewOrientation(data: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  return response;
}
