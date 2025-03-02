"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/system";

interface Post {
  create_date: string;
  post_id: string;
  name: string;
  title: string;
  content: string;
}

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "15px",
});

export default function Board() {
  const [postData, setPostData] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    getBoardList();
  }, [page, rowsPerPage]);

  const getBoardList = async () => {
    try {
      const res = await fetch(
        `/api/post/list?page=${page + 1}&size=${rowsPerPage}&sort=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("res", res);

      const data = await res.json();

      console.log("data", data);

      if (res.ok && res.status === 200) {
        setPostData(data.content);
        setTotalElements(data.totalElements);
      }
    } catch (error) {
      console.error("getBoardList - Error", error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="">
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>번호</StyledTableCell>
              <StyledTableCell>제목</StyledTableCell>
              <StyledTableCell>작성자</StyledTableCell>
              <StyledTableCell>작성일</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postData.map((post) => (
              <TableRow key={post.post_id} hover>
                <TableCell align="center">{post.post_id}</TableCell>
                <TableCell align="center">{post.title}</TableCell>
                <TableCell align="center">{post.name}</TableCell>
                <TableCell align="center">
                  {new Date(post.create_date).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
