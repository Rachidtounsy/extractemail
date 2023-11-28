function extractEmails() {
  var emailExtension = document.getElementById('emailExtension').value;
  var emailInput = document.getElementById('emailInput').value;
  var emailList = document.getElementById('emailList');
  var copyButton = document.getElementById('copyButton');
  var errorMsg = document.getElementById('errorMsg');
  
  // Validate that the extension field is not empty
  if (!emailExtension.trim()) {
    errorMsg.textContent = "Veuillez entrer l'extension de l'email.";
    return;
  } else {
    errorMsg.textContent = "";
  }

  // Escape special characters in the extension and create a dynamic regex
  var escapedExtension = escapeRegExp(emailExtension);
  var emailPattern = new RegExp('\\b[A-Za-z0-9._%+-]+@' + escapedExtension + '\\b', 'g');
  
  var emails = emailInput.match(emailPattern);

  // Clear the previous list
  emailList.innerHTML = '';

  // Display the extracted emails in a list
  if (emails) {
    emails.forEach(function (email) {
      var li = document.createElement('li');
      li.textContent = email;
      emailList.appendChild(li);
    });

    // Enable the copy button
    copyButton.disabled = false;
  } else {
    alert('Aucun e-mail trouvé pour l\'extension spécifiée.');
    // Disable the copy button if no emails are found
    copyButton.disabled = true;
  }
}

function copyResults() {
  var emailList = document.getElementById('emailList');
  var textToCopy = Array.from(emailList.children).map(li => li.textContent).join('\n');

  // Create a textarea to copy the text to the clipboard
  var textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert('Résultats copiés dans le presse-papiers !');
}

// Function to escape special characters in a string
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
