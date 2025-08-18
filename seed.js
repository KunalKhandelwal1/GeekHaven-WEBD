import axios from "axios";
import QUESTION from "./models/question.js";
import CATEGORY from "./models/category.js";
async function fetchingData() {
  try {
    const response = await axios.get(
      "https://test-data-gules.vercel.app/data.json"
    );
    const categories = response.data.data;

    await QUESTION.deleteMany({});
    await CATEGORY.deleteMany({});
    console.log(" Old data cleared");
    const d = ["Easy", "Medium", "Hard"];
    for (const category of categories) {
      const formattedQuestions = category.ques.map((q) => ({
        title: q.title,
        youtube:q.yt_link,
        url1: q.p1_link,
        url2:q.p2_link,
        difficulty: d[Math.floor(Math.random() * d.length)], 
      }));

      const savedQuestions = await QUESTION.insertMany(formattedQuestions);

      const questionIds = savedQuestions.map((q) => q._id);


      await CATEGORY.create({
        title: category.title, 
        questions: questionIds, 
      });
    }
    console.log("Fresh data inserted into DB");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

export { fetchingData };
