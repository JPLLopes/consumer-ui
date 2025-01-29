import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Row = ({ products, brand }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row"> {brand}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Country</TableCell>
                                        <TableCell align="right">Brand</TableCell>
                                        <TableCell align="right">Product Id</TableCell>
                                        <TableCell align="right">Shop Name</TableCell>
                                        <TableCell align="right">Product Category Id</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Url</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell component="th" scope="row">{product.id}</TableCell>
                                            <TableCell>{product.country}</TableCell>
                                            <TableCell>{product.brand}</TableCell>
                                            <TableCell>{product.product_id}</TableCell>
                                            <TableCell>{product.shop_name}</TableCell>
                                            <TableCell>{product.product_category_id}</TableCell>
                                            <TableCell>{product.price} €</TableCell>
                                            <TableCell>{product.url}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const DataTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "5%" }} size='medium'></TableCell>
                        <TableCell>Products</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.products_per_name.map((product) => (
                        <Row key={uuidv4()} products={product.products} brand={product.name} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default DataTable;