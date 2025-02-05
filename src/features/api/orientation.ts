// const API_URL = "http://mon-projet-fastapi.onrender.com/predict/";
const API_URL = "http://127.0.0.1:8000/predict/";
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
