// Initialize CV content from localStorage
function initCv() {
    cvData = JSON.parse(localStorage.getItem('iitkgpCvData'));
    if (cvData) {
        cv.innerHTML = cvData;
    }
}

// Initialize the CV
initCv();

// Save CV content to localStorage
$('#saveCv').on('click', (event) => {
    cv.removeAttribute('contenteditable');
    localStorage.setItem('iitkgpCvData', JSON.stringify(cv.innerHTML));
});

// Reset CV content and reload the page
$('#resetCv').on('click', (event) => {
    localStorage.removeItem('iitkgpCvData');
    location.reload();
});

// Custom handling for Ctrl + B to bold only selected text
document.getElementById('cv').addEventListener('keydown', function (event) {
    // Check if 'Ctrl + B' (or 'Cmd + B' on Mac) is pressed
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault(); // Prevent default behavior (bold entire line)

        // Get the current text selection
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // Create a <strong> element and wrap the selected text
            const strong = document.createElement('strong');
            strong.textContent = range.toString();

            // Replace the selected text with the <strong> element
            range.deleteContents();
            range.insertNode(strong);

            // Move the cursor to after the inserted bold text
            selection.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStartAfter(strong);
            newRange.collapse(true);
            selection.addRange(newRange);
        }
    }
});
