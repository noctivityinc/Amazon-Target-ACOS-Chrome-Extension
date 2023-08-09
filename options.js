// Saves options to chrome.storage
const saveOptions = () => {
  const targetACOS = document.getElementById('target_acos').value;

  chrome.storage.sync.set(
    { targetACOS: targetACOS },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      status.classList.remove('d-none');
      setTimeout(() => {
        status.textContent = '';
        status.classList.add('d-none');
      }, 750);
    }
  );
};

// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { targetACOS: '25'},
    (items) => {
      document.getElementById('target_acos').value = items.targetACOS;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);