import React, { Component } from "react";
import { PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "./App.css";
import Stores from "./models";

const {ProdStore} = Stores;

class App extends Component {
  state = { allProducts: [{}] };


  componentDidMount = async () => {
    const { prodList } = ProdStore;
    await this.setState({ allProducts: prodList });

    // fetch("../products.csv")
    //   .then((response) => response.text())
    //   .then(data => this.compileDataIntoStore(data));
  }

  compileDataIntoStore = (data) => {
    const linhaProduto= data.split("\n");

    const todosProdutos = []
    for (let i = 1; i < linhaProduto.length; i++) {
      const colunas = linhaProduto[i].split(";");
      const produto = {
        name: colunas[2],
      };
      todosProdutos.push(produto);
    }
    console.log(todosProdutos);
    this.setState({allProducts: todosProdutos})
  }

  renderCard = (produto) => {
    const {foto, nome, marca,preco} = produto
    return (
      <div className="body">
        <div className="card">  
          <div className="card_image">
            <img src={foto} alt=''/>
          </div>
          <div className="card_title">
            <h2 >{nome}</h2>
          </div>
          <div className="card_brand">
            <p >{marca}</p>
          </div>
          <div className="card_price">
            <p >{preco}</p>
          </div>
        </div>
      </div>
    );
  }

  card = () => {
    const {prodList} = ProdStore;
    const objeto = JSON.parse(JSON.stringify(prodList));
    const mappedProducts = [...Array(objeto.length)].map((_,index) => { 

    const produto = objeto[index];
    return this.renderCard(produto);  
    });
    return mappedProducts 
  }
  

  render() {
    const { prodList } = ProdStore;
    return (
      <SearchProvider>
        <div className="App">
          <Layout
            header={<SearchBox />}
            // bodyContent={<Results titleField={prodList.nome} urlField={prodList.foto} />}
            sideContent={
              <div>
                <Sorting
                  label={"Ordernar por"}
                  sortOptions={[
                    {
                      name: "Nome",
                      value: prodList.nome,
                      direction: "asc"
                    },
                    {
                      name: "Marca",
                      value: prodList.marca,
                      direction: "asc"
                    },
                    {
                      name: "Preço",
                      value: prodList.preco,
                      direction: "asc"
                    }
                  ]}
                />
                <Facet field={prodList.preco} label="Preço" />
                <Facet field={prodList.marca} label="Marca" isFilterable={true} />
              </div>
            }
            bodyHeader={
              <>
                {this.card()}
                {/* <PagingInfo />
                <ResultsPerPage /> */}
              </>
            }
            bodyFooter={<Paging />}
          />
        </div>
      </SearchProvider>
    );
  }
}
export default App;