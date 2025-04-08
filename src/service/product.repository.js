class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createProduct = async (productData) => {		
        return await this.dao.create(productData)
    }
    getProducts = async () => {		
        return await this.dao.get()
    }
    getProduct = async (id) => {		
        return await this.dao.getBy(id)
    }
    deleteProduct = async (id) => {		
        return await this.dao.delete(id)
    }
    updateProduct = async (id, productData) => {		
        return await this.dao.update(id, productData)
    }
    updateProductStock = async (id, quantity) => {
        return await this.dao.updateProductStock(id, quantity)
    };
}
export default ProductRepository