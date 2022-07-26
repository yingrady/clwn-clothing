import ProductCard from '../../components/product-card/product-card.component';
import {useSelector} from 'react-redux';

import { selectCategoriesMap, selectIsLoading } from '../../store/categories/categories.selector';
import { useState,useEffect,Fragment } from 'react';

import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';

import {CategoryContainer, CategoryTitle} from './category.styles';

const Category = () =>{
  const {category} = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading)
  const [products,setProducts] = useState(categoriesMap[category]);
  useEffect(()=>{
    setProducts(categoriesMap[category]);
  },[categoriesMap,category])
  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner/>
      ): (
        <CategoryContainer>
        {products && products.map((product)=><ProductCard key={product.id} product={product}/>)}
        </CategoryContainer>
      )}
      
    </Fragment>
    
  )
};

export default Category;