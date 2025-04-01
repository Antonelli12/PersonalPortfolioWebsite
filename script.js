// Get the theme-toggle button
const themeToggle = document.getElementById("theme-toggle");


// Function to Switch Themes
themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("light-mode"); //Toggles on/off the light mode class

    //Updates the button based on the mode selected
    if(document.body.classList.contains("light-mode")){
        themeToggle.innerText = "🌙";
    } else {
        themeToggle.innerText = "🌞";
    }
});