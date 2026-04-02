// Form Input Sanitization and Validation
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SANITIZATION FUNCTIONS =====
  
  // Remove HTML tags and dangerous characters to prevent XSS attacks
  function sanitizeText(input) {
    if (!input) return '';
    return input
      .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
      .replace(/['"]/g, '') // Remove quotes to prevent attribute injection
      .trim(); // Remove leading/trailing whitespace
  }
  
  // Sanitize and limit name/company fields (letters, spaces, hyphens, apostrophes only)
  function sanitizeName(input) {
    if (!input) return '';
    return input
      .replace(/[^a-zA-Z\s\-'\.]/g, '') // Only allow letters, spaces, hyphens, apostrophes, periods
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .slice(0, 100) // Limit length to 100 characters
      .trim();
  }
  
  // Sanitize email (basic sanitization, browser validates format)
  function sanitizeEmail(input) {
    if (!input) return '';
    return input
      .replace(/[<>"']/g, '') // Remove dangerous characters
      .toLowerCase() // Convert to lowercase
      .slice(0, 254) // RFC 5321 max length
      .trim();
  }
  
  // Sanitize textarea (remove scripts but allow basic punctuation)
  function sanitizeTextarea(input) {
    if (!input) return '';
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/[<>]/g, '') // Remove < and >
      .slice(0, 1000) // Limit to 1000 characters
      .trim();
  }
  
  
  // ===== PHONE NUMBER FORMATTING =====
  
  const phoneInput = document.getElementById('phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Get the current value and remove all non-numeric characters
      let value = e.target.value.replace(/\D/g, '');
      
      // Limit to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      
      // Format the number based on length
      let formattedValue = '';
      
      if (value.length <= 3) {
        formattedValue = value.length > 0 ? '(' + value : '';
      } else if (value.length <= 6) {
        formattedValue = '(' + value.slice(0, 3) + ') ' + value.slice(3);
      } else {
        formattedValue = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6);
      }
      
      e.target.value = formattedValue;
    });
    
    phoneInput.addEventListener('paste', function(e) {
      setTimeout(function() {
        phoneInput.dispatchEvent(new Event('input'));
      }, 0);
    });
  }
  
  
  // ===== REAL-TIME SANITIZATION ON INPUT =====
  
  const nameInput = document.getElementById('name');
  const companyInput = document.getElementById('company');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  // Sanitize name field
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      this.value = sanitizeName(this.value);
    });
  }
  
  // Sanitize company field
  if (companyInput) {
    companyInput.addEventListener('blur', function() {
      this.value = sanitizeName(this.value);
    });
  }
  
  // Sanitize email field
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      this.value = sanitizeEmail(this.value);
    });
  }
  
  // Sanitize message field
  if (messageInput) {
    messageInput.addEventListener('blur', function() {
      this.value = sanitizeTextarea(this.value);
    });
  }
  
  
  // ===== FORM SUBMISSION WITH AJAX =====
  
  const form = document.querySelector('form[name="contact"]');
  const formSuccess = document.getElementById('form-success');
  const submitButton = form ? form.querySelector('button[type="submit"]') : null;
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault(); // Prevent default form submission
      
      // Sanitize all fields one final time before submission
      if (nameInput) nameInput.value = sanitizeName(nameInput.value);
      if (companyInput) companyInput.value = sanitizeName(companyInput.value);
      if (emailInput) emailInput.value = sanitizeEmail(emailInput.value);
      if (messageInput) messageInput.value = sanitizeTextarea(messageInput.value);
      
      // Additional validation
      if (!nameInput.value || nameInput.value.length < 2) {
        alert('Please enter a valid name (at least 2 characters).');
        nameInput.focus();
        return false;
      }
      
      if (!emailInput.value || !emailInput.value.includes('@')) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return false;
      }
      
      // Disable submit button and show loading state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      
      // Prepare form data
      const formData = new FormData(form);
      
      try {
        // Submit to Formspree via AJAX (using the form's action URL)
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success! First, lock the form height to prevent layout shift
          const currentHeight = form.offsetHeight;
          form.style.minHeight = currentHeight + 'px';
          
          // Apply fade-out animation to form fields
          const formElements = form.querySelectorAll('input:not([type="hidden"]), textarea, select, button, label, .form-row, .form-note');
          
          // Add fade-out class to all form elements
          formElements.forEach(element => {
            element.classList.add('fade-out');
          });
          
          // Wait for fade-out animation to complete (600ms), then hide and show success
          setTimeout(() => {
            formElements.forEach(element => {
              element.style.display = 'none';
            });
            
            // Show success message (which will fade in)
            if (formSuccess) {
              formSuccess.style.display = 'block';
            }
            
            // Reset form (clears all values)
            form.reset();
          }, 600); // Match the fadeOut animation duration
          
        } else {
          // Handle error response
          const data = await response.json();
          if (data.errors) {
            alert('There was a problem with your submission. Please check the form and try again.');
          } else {
            alert('Oops! There was a problem submitting your form. Please try again.');
          }
          
          // Re-enable submit button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Request';
          }
        }
        
      } catch (error) {
        // Network error or other issue
        alert('There was a problem sending your message. Please check your internet connection and try again.');
        
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Request';
        }
      }
    });
  }
});
