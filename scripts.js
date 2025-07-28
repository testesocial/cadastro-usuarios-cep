const form = document.getElementById('cadastroForm');

// Restaurar dados ao carregar a página
window.addEventListener('load', () => {
  const dados = JSON.parse(localStorage.getItem('cadastro'));
  if (dados) {
    for (let campo in dados) {
      if (form.elements[campo]) {
        form.elements[campo].value = dados[campo];
      }
    }
  }
});

// Buscar endereço pelo CEP
document.getElementById('cep').addEventListener('blur', () => {
  const cep = document.getElementById('cep').value.trim();

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          form.rua.value = data.logradouro || '';
          form.bairro.value = data.bairro || '';
          form.cidade.value = data.localidade || '';
          form.estado.value = data.uf || '';
        } else {
          alert('CEP não encontrado.');
        }
      })
      .catch(() => alert('Erro ao buscar o CEP.'));
  }
});

// Salvar dados ao enviar o formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const dados = {
    nome: form.nome.value,
    cep: form.cep.value,
    rua: form.rua.value,
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    estado: form.estado.value
  };

  localStorage.setItem('cadastro', JSON.stringify(dados));
  alert('Dados salvos com sucesso!');
});
