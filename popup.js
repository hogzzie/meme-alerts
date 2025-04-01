async function fetchVideos() {
    const folderId = "1p_2GrX15eqCJ1Otwjw48E0lMpifbTilV";  // Replace with Google Drive folder ID
    const apiKey = "AIzaSyDKqOnCoEDeq7N70w28_T7zkf1oPi1d0UA";  // Replace with your Google API Key


    // Fetch file data from Google Drive API
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`);
    const data = await response.json();

    const memeContainer = document.getElementById("memeContainer");
    memeContainer.innerHTML = "";  // Clear the container first

    data.files.forEach(file => {
        // Create a container for each video with controls
        let container = document.createElement("div");
        container.className = "meme-video-container";

        // Embed the video using iframe (with the Google Drive preview link)
        let iframe = document.createElement("iframe");
        iframe.src = `https://drive.google.com/file/d/${file.id}/preview`;
        iframe.allow = "autoplay"; // Allow autoplay
        iframe.style.border = "none"; // Remove border
        iframe.className = "meme-video-iframe";
        iframe.allowFullscreen = true; // Allow fullscreen

        // Make iframe responsive by setting max-width and height
        iframe.style.width = "100%";
        iframe.style.height = "auto";
        iframe.style.maxWidth = "640px"; // Max width constraint
        iframe.style.maxHeight = "480px"; // Max height constraint

        // Click handler for selecting the meme
        iframe.onclick = () => selectMeme(file.id);

        // Append iframe to container
        container.appendChild(iframe);



        // Append the video container to the main meme container
        memeContainer.appendChild(container);
    });
}

function selectMeme(fileId) {
    fetch(`https://your-server.com/meme?fileId=${encodeURIComponent(fileId)}`)
        .then(response => alert("Meme Sent to Stream!"))
        .catch(error => console.error("Error:", error));
}

fetchVideos();  // Call the function to load the videos
