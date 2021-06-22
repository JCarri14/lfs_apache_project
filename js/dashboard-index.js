import { request } from "./utils/api-utils.js";
import { getCurrentUser } from "./utils/state-utils.js";

const shutdownURL = "http://localhost/scripts/system/process-off.sh";
const restartURL = "http://localhost/scripts/system/process-restart.sh";


window.onload = () => {
  const shutdownBtn = document.getElementById("shutdown-btn");
  shutdownBtn.addEventListener("click", handleShutdown);

  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", handleRestart);
}

async function handleShutdown() {
  const creator = await getCurrentUser();
  const postData = `creator:${creator}`;

  request({
    url: shutdownURL,
    method: "POST",
    body: postData,
  });
}

async function handleRestart() {
  const creator = await getCurrentUser();
  const postData = `creator:${creator}`;

  request({
    url: restartURL,
    method: "POST",
    body: postData
  });
}

