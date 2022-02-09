import {useEffect}  from 'react'
import React  from 'react'
import Button from '@material-ui/core/Button'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import  './paginationButton.css'

const PaginationButton = (props:{pageNumber:number, currentPage:number, setCurrentPage:(currentPageNumber:number) => void}) => {
    const[isCurrentPage,setIsCurrentPage] = React.useState(false)
   
    const setCurrentPage = () => {
        props.setCurrentPage(props.pageNumber);
    }
    
    useEffect(() => {
        setIsCurrentPage(props.currentPage === props.pageNumber)
    }, [props.currentPage]);

    return <div className="button-layout">{(isCurrentPage ? <Button  startIcon ={<MenuBookIcon/>} className = "page-button" variant="contained" color="secondary" onClick={setCurrentPage}>{props.pageNumber}</Button> :
     <Button  className = "page-button" variant="contained" color="primary" onClick={setCurrentPage}>{props.pageNumber}</Button>)}</div>
}

export default PaginationButton;