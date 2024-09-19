import axios from "axios";

const avatarSeeds = [
  "Adrian",
  "Easton",
  "Kimberly",
  "Kingston",
  "Joselyn",
  "Ryan",
  "Aidan",
  "Jack",
  "Brooklynn",
  "Sadie",
  "Liam",
  "Leo",
  "Brian",
  "Jude",
  "Aiden",
  "Emery",
  "Mason",
  "Christian",
  "Alexander",
  "Destiny",
];
const API_URL = "https://api.dicebear.com/9.x/pixel-art/svg";

export const useGenerateAvatar = async () => {
  const randomElement =
    avatarSeeds[Math.floor(Math.random() * avatarSeeds.length)];

  const response = await axios.get(`${API_URL}?seed=${randomElement}`);
  const avatarUrl = response.data;
  return avatarUrl;
};
