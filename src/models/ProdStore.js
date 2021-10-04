import { makeAutoObservable } from 'mobx'


class ProdStore {
  constructor() {
    makeAutoObservable(this)
  }
  prodList = [{
    foto: 'https://savegnago.vteximg.com.br/arquivos/ids/293238_2',
    nome: 'Borracha Escolar Faber Castell Super Soft',
    marca: 'Faber Castell',
    preco: 'R$ 5,39'
  },
  {
    foto: 'https://savegnago.vteximg.com.br/arquivos/ids/296943_2',
    nome: 'Cereal Barra Linea 60g Cookies Cream',
    marca: 'Linea',
    preco: 'R$ 4,99'
  },
  {
    foto: 'https://savegnago.vteximg.com.br/arquivos/ids/268054_2',
    nome: 'Sobremesa Chandelle 200g Chantilly Caramelo',
    marca: 'Chandelle',
    preco: 'R$ 4,99'
  },
  {
    foto: 'https://savegnago.vteximg.com.br/arquivos/ids/448210_2',
    nome: 'Tempero Smart Zero Sódio 48g Frango',
    marca: 'Smart',
    preco: 'R$ 18,38'
  }
  ];

  addProduct(prod, initials) {
    this.prodList.push(prod)
    this.prodList.push({name: prod, initials: initials, index: this.prodList.length})
  }

  deleteProduct(prod) {
    if(this.prodList.length === 1) throw new Error("Não é possível deletar todos os Produtos")
    let allProducts = JSON.parse(JSON.stringify(this.prodList))
    const foundProd = allProducts.find((oneProd) => oneProd.prod === prod)
    const indexOf = foundProd.index

    this.prodList.splice(indexOf, 1)
    this.defaultAsFirst()
  }
}
export default ProdStore;