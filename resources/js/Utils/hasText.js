// Use to check if the string html description containts an actual text not just html tags
// Return true or false
export function hasText(html) {
    // Create a temporary element
    const div = document.createElement("div");
    div.innerHTML = html;

    // Get only the text (no tags)
    const text = div.textContent || div.innerText || "";

    // Trim spaces and check length
    return text.trim().length > 0;
}
