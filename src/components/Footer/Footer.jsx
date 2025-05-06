import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { LineChart } from '@mui/x-charts/LineChart';
import { SparkLineChart } from '@mui/x-charts';

export default function Footer() {
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 1241) + 20); // Số người dùng online ban đầu
  const [totalProducts] = useState(300); // Tổng số sản phẩm cố định
  const [soldProducts, setSoldProducts] = useState(81); // Số sản phẩm đã bán ban đầu

  // Tính toán sản phẩm còn lại (derived value)
  const availableProducts = totalProducts - soldProducts;

  // === Effect để cập nhật số người dùng online giả lập ===
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Giả lập số người dùng thay đổi ngẫu nhiên (tăng/giảm nhẹ)
      const change = Math.floor(Math.random() * 30) - 15; // Thay đổi từ -7 đến +7
      setActiveUsers(prevUsers => {
        const newUsers = prevUsers + change;

        return Math.max(527, Math.min(2450, newUsers));
      });
    }, 3000); // Cập nhật mỗi 3 giây

    // Cleanup function để xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, []); // [] đảm bảo effect chỉ chạy một lần khi component mount và cleanup khi unmount

  // === Effect để giả lập việc bán thêm sản phẩm ===
  useEffect(() => {
    // 1 ngày = 24 giờ * 60 phút/giờ * 60 giây/phút * 1000 mili giây/giây
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // 86,400,000

    const salesIntervalId = setInterval(() => {
      setSoldProducts(prevSold => {
        const remaining = totalProducts - prevSold;
        const itemsToSellInThisInterval = 2; // Số lượng cố định bán trong mỗi interval

        // Tính toán số lượng thực tế có thể bán dựa trên hàng tồn kho
        const actualItemsSold = Math.min(remaining, itemsToSellInThisInterval);

        // Nếu không còn hàng để bán, dừng interval
        if (actualItemsSold <= 0) {
          clearInterval(salesIntervalId); // Dừng giả lập
          return prevSold; // Giữ nguyên số lượng đã bán
        }

        // Cập nhật số lượng đã bán
        return prevSold + actualItemsSold;
      });
    }, millisecondsPerDay); // Đặt interval là 1 ngày

    // Cleanup function để xóa interval khi component unmount
    return () => clearInterval(salesIntervalId);

  }, [totalProducts]); // Phụ thuộc vào totalProducts nếu nó có thể thay đổi (ở đây thì không, nhưng là best practice)

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        py: 2,
        bgcolor: 'rgba(10, 12, 10, 0.9)',
        color: 'grey.100',
      }}
    >
      {/* Social media icons on the left */}
      <Box>
        <IconButton href="https://x.com/XDravoX" target='_blank' aria-label="X" sx={{ color: 'inherit' }}>
          <XIcon />
        </IconButton>

      </Box>

      {/* Three clickable buttons in the center */}
      <Box ml={10} sx={{ fontSize: '0.8em', textAlign: 'right', display: 'flex', alignItems: 'flex-end' }}>
        <Typography variant="body2" color="inherit" mr={2}>
          <span style={{ color: 'rgb(221, 0, 255)' }}>Live Users:</span> <span style={{ fontWeight: 'bold' }}>{activeUsers}</span>
        </Typography>
        <Typography variant="body2" color="inherit">
          Products: <span style={{ fontWeight: 'bold' }}>{soldProducts}</span>
          <span style={{ color: 'red' }}> Sold </span>
          / <span style={{ fontWeight: 'bold' }}>{availableProducts}</span>
          <span style={{ color: 'rgb(0, 255, 115)' }}> Avail</span>
        </Typography>
        <SparkLineChart
          data={[6, 4, 5, 9, 3, 9, 11, 15]}
          height={30}
          width={120}
          showTooltip
          showHighlight
          color="rgb(179, 255, 48)"
        />
      </Box>
      {/* Copyright text on the right */}
      <Typography variant="body2">
        © {new Date().getFullYear()} DravoX. All rights reserved.
      </Typography>
    </Box>
  );
}
