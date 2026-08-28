function ItemCardapio({ nome, descricao, preco }) {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <strong>R${preco}</strong>
        </div>
    );
}

export default ItemCardapio;
