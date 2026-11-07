const auth = document.getElementById('auth');
const dashboard = document.getElementById('dashboard');
const form = document.getElementById('registerForm');
const phoneInput = document.getElementById('phone');
const balanceEl = document.getElementById('balance');
const taskButton = document.getElementById('completeTask');
const taskMessage = document.getElementById('taskMessage');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalLink = document.getElementById('modalLink');
let balance = 0;
let taskDone = false;

function showModal(title, message, showLink=false) {
  modalTitle.textContent = title;
  modalText.textContent = message;
  modalLink.classList.toggle('hidden', !showLink);
  modal.classList.remove('hidden');
}
function updateBalance() { balanceEl.textContent = balance.toLocaleString('fr-FR'); }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = phoneInput.value.replace(/\s+/g, '');
  if (!/^\d{8,15}$/.test(phone)) {
    showModal('Numéro invalide', 'Entrez un numéro de téléphone valide, sans indicatif dans ce champ.');
    return;
  }
  document.getElementById('userPhone').textContent = '+228 ' + phone;
  auth.classList.add('hidden');
  dashboard.classList.remove('hidden');
  document.getElementById('today').textContent = new Date().toLocaleDateString('fr-FR', {day:'2-digit', month:'short', year:'numeric'});
});

taskButton.addEventListener('click', () => {
  if (taskDone) {
    taskMessage.textContent = 'La tâche de démonstration a déjà été validée aujourd’hui.';
    return;
  }
  taskDone = true;
  balance += 100;
  updateBalance();
  taskButton.textContent = 'Tâche validée ✓';
  taskButton.disabled = true;
  taskButton.style.opacity = '.7';
  taskMessage.textContent = 'Bravo ! 100 FCFA fictifs ont été ajoutés à votre solde de démonstration.';
});

document.getElementById('deposit').addEventListener('click', () => {
  showModal('Informations de dépôt', 'Dans un service réel, les coordonnées, les frais, les conditions et les risques doivent être clairement publiés et vérifiables. Cette maquette ne collecte aucun dépôt.', true);
});
document.getElementById('withdraw').addEventListener('click', () => {
  if (balance < 1000) {
    showModal('Seuil non atteint', 'Le seuil minimum affiché est de 1 000 FCFA. Votre solde de démonstration est de ' + balance + ' FCFA. Aucun retrait réel n’est disponible.');
  } else {
    showModal('Simulation de retrait', 'Votre solde fictif atteint le seuil de 1 000 FCFA. Aucun argent réel ne peut être retiré depuis cette maquette.');
  }
});
document.getElementById('logout').addEventListener('click', () => {
  dashboard.classList.add('hidden');
  auth.classList.remove('hidden');
  balance = 0; taskDone = false; updateBalance();
  taskButton.disabled = false; taskButton.textContent = 'Valider la tâche'; taskButton.style.opacity = '1';
  taskMessage.textContent = 'Une tâche de démonstration est disponible aujourd’hui.';
});
document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));
document.getElementById('modalOk').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
