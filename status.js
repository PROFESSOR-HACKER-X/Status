// Statuses ka data (Aap isme aur bhi add kar sakte hain)
const statuses = [
  { id: 1, category: "attitude", text: "Khamoshi se bhi kaam chal jata hai, bas samajhne wala chahiye. 😎" },
  { id: 2, category: "attitude", text: "Sikandar halat ke aage nahi jhukta, tara toot bhi jaye zameen par nahi girta. 👑" },
  { id: 3, category: "motivation", text: "Mehnat itni khamoshi se karo ki kamyabi shor macha de. 🔥" },
  { id: 4, category: "motivation", text: "Zindagi me agar bada karna hai na, to darna band karo. 🚀" },
  { id: 5, category: "love", text: "Tum mile to har khushi mil gayi hai, aisa lagta hai jaise jannat mil gayi hai. ❤️" },
  { id: 6, category: "love", text: "Dil ki bas ek hi khwahish hai, tum hamesha mere paas raho. ✨" }
];

export default function handler(req, res) {
  // CORS Headers (Taaki aap is API ko kisi bhi website ya app me use kar sakein)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  // URL se category check karna (e.g., ?category=motivation)
  const { category } = req.query;

  let filteredStatuses = statuses;

  if (category) {
    filteredStatuses = statuses.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  // Agar galat category search ki ho to error dena
  if (filteredStatuses.length === 0) {
    return res.status(404).json({
      success: false,
      message: `Koi status nahi mila is category me: ${category}`
    });
  }

  // Random status select karne ka formula
  const randomIndex = Math.floor(Math.random() * filteredStatuses.length);
  const randomStatus = filteredStatuses[randomIndex];

  // Response bhejna
  return res.status(200).json({
    success: true,
    data: randomStatus
  });
}
