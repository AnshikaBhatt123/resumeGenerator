document.addEventListener("DOMContentLoaded", function () {
    const resumeForm = document.getElementById("resumeForm");
    const resumeOutput = document.getElementById("resumeOutput");
    const downloadPDFButton = document.getElementById("downloadPDF");
    const downloadWordButton = document.getElementById("downloadWord");
    const templateSelect = document.getElementById("templateSelect");
    const previewButton = document.getElementById("previewButton");

    // Function to generate the resume content
    function generateResume() {
        // Get form input values
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const eduDegree = document.getElementById("eduDegree").value;
        const eduSchool = document.getElementById("eduSchool").value;
        const expTitle = document.getElementById("expTitle").value;
        const expCompany = document.getElementById("expCompany").value;

        // Get the selected template
        const selectedTemplate = templateSelect.value;

        // Create a simple resume structure based on the selected template
        let resumeHTML = "";
        if (selectedTemplate === "template1") {
            resumeHTML = `
                <h2>${fullName}</h2>
                <p>Email: ${email}</p>
                <h3>Education</h3>
                <p>${eduDegree} at ${eduSchool}</p>
                <h3>Experience</h3>
                <p>${expTitle} at ${expCompany}</p>
                <!-- Customize template 1 as needed -->
            `;
        } else if (selectedTemplate === "template2") {
            resumeHTML = `
                <h1>${fullName}</h1>
                <p>Email: ${email}</p>
                <h2>Education</h2>
                <p>${eduDegree} at ${eduSchool}</p>
                <h2>Experience</h2>
                <p>${expTitle} at ${expCompany}</p>
                <!-- Customize template 2 as needed -->
            `;
        }

        // Display the generated resume
        resumeOutput.innerHTML = resumeHTML;

        // Enable download buttons
        downloadPDFButton.disabled = false;
        downloadWordButton.disabled = false;
    }

    // Preview button click event
    previewButton.addEventListener("click", generateResume);

    // Download as PDF
    downloadPDFButton.addEventListener("click", function () {
        const pdf = new jsPDF();
        const resumeContent = document.getElementById("resumeOutput").innerHTML;
        pdf.fromHTML(resumeContent, 10, 10);
        pdf.save("resume.pdf");
    });

    // Download as Word
    downloadWordButton.addEventListener("click", function () {
        const resumeContent = document.getElementById("resumeOutput").innerHTML;

        // Use Mammoth.js to convert HTML to Word
        mammoth.convert({ html: resumeContent })
            .then(function (result) {
                const blob = new Blob([result.value], { type: "application/msword" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "resume.docx";
                link.click();
            })
            .catch(function (err) {
                console.log(err);
            });
    });
});
