import ItemCardapio from './components/ItemCardapio';
import { useState, useEffect } from 'react';

function App() {
    const [cardapio, setCardapio] = useState([]);
    const [itensCarrinho, setItensCarrinho] = useState(0);

    // Estados para a Atividade 15 (Checkout e Modal)
    const [endereco, setEndereco] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');

    useEffect(() => {
        console.log('Conectando ao servidor...');
        const timer = setTimeout(() => {
            setCardapio([
                {
                    categoria: '🍔 Hambúrgueres',
                    itens: [
                        {
                            id: 1,
                            nome: 'X-Burguer Clássico',
                            preco: 25.0,
                            desc: 'Pão, hambúrguer 180g, queijo cheddar e maionese da casa.',
                        },
                        {
                            id: 2,
                            nome: 'X-Bacon Especial',
                            preco: 32.0,
                            desc: 'Pão brioche, 180g de carne, queijo, muito bacon crocante e BBQ.',
                        },
                        {
                            id: 3,
                            nome: 'Smash Burger Duplo',
                            preco: 28.0,
                            desc: 'Dois discos smash 90g, queijo americano, picles e molho especial.',
                        },
                    ],
                },
                {
                    categoria: '🍧 Açaí',
                    itens: [
                        {
                            id: 4,
                            nome: 'Açaí Tradicional 300ml',
                            preco: 15.0,
                            desc: 'Açaí cremoso com banana, granola e leite em pó.',
                        },
                        {
                            id: 5,
                            nome: 'Açaí Especial 500ml',
                            preco: 22.0,
                            desc: 'Açaí no copo com morango, leite condensado, paçoca e Leite Ninho.',
                        },
                    ],
                },
                {
                    categoria: '🥤 Refrigerantes & Bebidas',
                    itens: [
                        {
                            id: 6,
                            nome: 'Coca-Cola Lata 350ml',
                            preco: 6.0,
                            desc: 'Lata trincando de gelada.',
                        },
                        {
                            id: 7,
                            nome: 'Guaraná Antarctica 350ml',
                            preco: 6.0,
                            desc: 'Lata 350ml gelada.',
                        },
                        {
                            id: 8,
                            nome: 'Suco Natural de Laranja 500ml',
                            preco: 9.0,
                            desc: 'Feito na hora, 100% fruta.',
                        },
                    ],
                },
            ]);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Função de checkout com as regras de negócio
    const finalizarCompra = (e) => {
        e.preventDefault();

        if (itensCarrinho === 0) {
            setMensagemModal('Coloque algo no carrinho!');
            setModalAberto(true);
            return;
        }

        if (endereco.trim() === '') {
            setMensagemModal('Por favor, digite o seu endereço para entrega!');
            setModalAberto(true);
            return;
        }

        setMensagemModal(`Pedido realizado com sucesso! Enviaremos para: ${endereco}`);
        setModalAberto(true);

        // Reset dos estados após sucesso
        setItensCarrinho(0);
        setEndereco('');
    };

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'sans-serif',
                maxWidth: '600px',
                margin: '0 auto',
            }}>
            {/* Modal Condicional */}
            {modalAberto && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Aviso</h3>
                        <p>{mensagemModal}</p>
                        <button onClick={() => setModalAberto(false)} style={styles.btnOk}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Topo / Cabecalho */}
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    borderBottom: '2px solid #eee',
                    paddingBottom: '10px',
                }}>
                <h1>Senai Delivery</h1>
                <div
                    style={{
                        backgroundColor: '#222',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                    }}>
                    🛒 {itensCarrinho} itens
                </div>
            </header>

            {/* Renderização do Cardápio por Categorias */}
            {cardapio.length === 0 ? (
                <h2>🔄 Carregando restaurante...</h2>
            ) : (
                cardapio.map((secao) => (
                    <div key={secao.categoria} style={{ marginBottom: '25px' }}>
                        <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                            {secao.categoria}
                        </h2>
                        {secao.itens.map((item) => (
                            <ItemCardapio
                                key={item.id}
                                nome={item.nome}
                                descricao={item.desc}
                                preco={item.preco}
                                adicionarItem={() => setItensCarrinho(itensCarrinho + 1)}
                            />
                        ))}
                    </div>
                ))
            )}

            {/* Área de Checkout no Rodapé */}
            <footer style={styles.checkout}>
                <h2>Finalizar Pedido 🛵</h2>
                <form onSubmit={finalizarCompra}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        Rua e Número da Entrega:
                    </label>
                    <input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Ex: Rua das Flores, 123"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.btnFinalizar}>
                        Finalizar Pedido
                    </button>
                </form>
            </footer>
        </div>
    );
}

// Estilos auxiliares para o Modal e Checkout
const styles = {
    checkout: {
        backgroundColor: '#f1f2f6',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '30px',
    },
    input: {
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    btnFinalizar: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#ff4757',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px 30px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '80%',
    },
    btnOk: {
        marginTop: '15px',
        padding: '8px 20px',
        backgroundColor: '#2ed573',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default App;
