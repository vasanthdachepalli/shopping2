document.getElementById("welcomeForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
   
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
   
    fetch("your-server-endpoint-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObject)
    })
    .then(response => {
      if (response.ok) {
        window.location.href = "home.html"; 
      } else {
        throw new Error("Failed to submit form");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      
    });
  });
