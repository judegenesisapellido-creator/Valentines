const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const askContainer = document.getElementById("askContainer");
const successContainer = document.getElementById("successContainer");

let yesScale = 1;
let noClickCount = 1;

// Your preferred GIFs
const gifs = [
  "https://tenor.com/view/ice-cream-cry-melt-sad-tears-gif-14726891",
  "https://tenor.com/view/tkthao219-bubududu-panda-gif-14934013747571988292",
  "https://tenor.com/view/bubu-dudu-bubu-dudu-motki-motki-bubu-gif-2108373800039382222",
  "https://tenor.com/view/tkthao219-bubududu-panda-gif-22065967",
];

const noMessages = [
  "Ayaw mo talaga?",
  "Sure ka ayaw mo?",
  "Keisha Cutie, please?",
  "Last chance!",
  "Maling pindot lang ata",
  "Bibigyan kitang Ice Cream!",
];

// Helper to extract Tenor ID from your links
function getTenorId(link) {
  if (link.includes("media.tenor.com")) {
    return link.split("/")[3]; // Extracts "O6S7A_H6t8cAAAAM"
  }
  return link.split("-").pop(); // Extracts the numbers from the end
}

noBtn.addEventListener("click", () => {
  // 1. Update GIF using YOUR 'gifs' array
  const currentGifLink = gifs[noClickCount % gifs.length];
  const newPostId = getTenorId(currentGifLink);

  const gifWrapper = document.querySelector(".gif-wrapper");
  gifWrapper.innerHTML = `
    <div id="mainGif" class="tenor-gif-embed" 
         data-postid="${newPostId}" 
         data-share-method="host" 
         data-aspect-ratio="1" 
         data-width="100%">
    </div>
  `;

  // Re-inject Tenor script to render the specific ID
  const script = document.createElement("script");
  script.src = "https://tenor.com/embed.js";
  script.async = true;
  gifWrapper.appendChild(script);

  // 2. Change 'No' text
  noBtn.innerText = noMessages[Math.min(noClickCount, noMessages.length - 1)];

  // 3. Scale 'Yes' button
  yesScale += 0.5;
  yesBtn.style.transform = `scale(${yesScale})`;

  // 4. Move 'No' button
  const padding = 50;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;
  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  noClickCount++; // Increment after logic so first click uses index 0
});

yesBtn.addEventListener("click", () => {
  askContainer.classList.add("hidden");
  successContainer.classList.remove("hidden");
  noBtn.style.display = "none";
});
