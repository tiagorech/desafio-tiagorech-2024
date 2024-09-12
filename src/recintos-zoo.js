class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3, carnívoro: false }] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1, carnívoro: false }] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1, carnívoro: true }] }
    ];

    this.animais = {
      'LEAO': { tamanho: 3, biomas: ['savana'], carnívoro: true },
      'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnívoro: true },
      'CROCODILO': { tamanho: 3, biomas: ['rio'], carnívoro: true },
      'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnívoro: false },
      'GAZELA': { tamanho: 2, biomas: ['savana'], carnívoro: false },
      'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnívoro: false }
    };
  }

  analisaRecintos(especie, quantidade) {
    // Validação de espécie e quantidade
    if (!this.animais[especie]) {
      return { erro: "Animal inválido" };
    }
    if (typeof quantidade !== 'number' || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }
  
    const animal = this.animais[especie];
    let recintosViaveis = [];
  
    // Percorre os recintos e verifica as condições
    for (const recinto of this.recintos) {
      const biomaCompativel = animal.biomas.includes(recinto.bioma) || recinto.bioma.includes(animal.biomas[0]);
      let espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0);
      let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
  
      // Verificar se o bioma é compatível
      if (!biomaCompativel) continue;
  
      // Impedir que não carnívoros sejam colocados com carnívoros
      const haCarnivoroNoRecinto = recinto.animais.some(a => this.animais[a.especie].carnívoro);
      if (!animal.carnívoro && haCarnivoroNoRecinto) continue;  // Não colocar não carnívoros com carnívoros
  
      // Verificar carnívoros: Só convivem com sua própria espécie
      if (animal.carnívoro && recinto.animais.some(a => a.especie !== especie)) continue;
  
      // Macacos não podem ficar sozinhos
      if (especie === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) continue;
  
      // Hipopótamos só aceitam outras espécies na savana e rio
      if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) continue;
  
      // Verificar se há mais de uma espécie no recinto antes de adicionar espaço extra
      const diferentesEspecies = recinto.animais.some(a => a.especie !== especie);
      if (diferentesEspecies) espacoLivre -= 1;  // Apenas quando há espécies diferentes
  
      // Verificar se há espaço suficiente
      if (espacoLivre >= animal.tamanho * quantidade) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - animal.tamanho * quantidade} total: ${recinto.tamanhoTotal})`);
      }
    }
  
    // Retorna a lista de recintos viáveis ou mensagem de erro
    return recintosViaveis.length > 0
      ? { recintosViaveis }
      : { erro: "Não há recinto viável" };
  }
  
}


export { RecintosZoo as RecintosZoo };