import React, { useState } from "react";
import { useUser } from '../context/UserContext';
import { Grid, Paper, Avatar, Typography, Button } from '@mui/material';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { API_IMAGE } from '../../services/book.service';
import UserInformationForm from '../user/UserUpdateInfo';
import UserUpdateAvatar from '../user/UserUpdateAvatar';
// import AddressAll from '../address/AddressAll';
import UpdateAdressUser from "../user/UpdateAddressUser";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import UserHistoryInvoice from "../user/UserHistoryInvoice";
import UserProcessingInvoice from "../user/UserProcessingInvoice";

// import AuthService from "../../services/auth.service";

const Profile = () => {
  // const currentUser = AuthService.getCurrentUser();
  const { user, setUser } = useUser();

  const [editing, setEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [infoInvoice, setInfoInvoice] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  // };
  
// Kiểm tra user và editing trước khi sử dụng
  if (!user || typeof editing !== 'boolean') {
    // Xử lý nếu user hoặc editing không tồn tại
    return console.error; // hoặc hiển thị thông báo lỗi
  }

  // // Kiểm tra user và user.addresses trước khi sử dụng
  // if (!user || !user?.addresses || user?.addresses?.length === 0) {
  //   // Xử lý nếu user không có địa chỉ hoặc là một mảng trống
  //   return console.error // hoặc hiển thị thông báo lỗi
  // }

  // Kiểm tra user và user.profileImage trước khi sử dụng
  const avatarSrc = user?.profileImage ? `${API_IMAGE}${user?.profileImage?.idImage}` : "//ssl.gstatic.com/accounts/ui/avatar_2x.png";

  // Kiểm tra user.addresses trước khi truy cập phần tử cuối cùng
  // const lastAddress = user?.addresses[user?.addresses?.length - 1];
  // if (!lastAddress) {
  //   // Xử lý nếu mảng không có phần tử
  //   return <p>Không có địa chỉ cuối cùng.</p>; // hoặc hiển thị thông báo lỗi
  // }

  const handleUpdate = async (updatedUser) => {
    // Cập nhật thông tin người dùng trong state hoặc thực hiện các xử lý khác
    await setUser(updatedUser);
  } 

  return (
    // <Container spacing={2}>
    // <Grid item md={9} lg={7} xl={5} marginBottom={2}>
    //   <Paper variant="outlined" sx={{ borderRadius: 2, p: 4 }}>
    //     <Grid container alignItems="center" spacing={2}>
    //       <Grid item xs={12} sm={2}>
    //         <Avatar
    //           src={(`${API_IMAGE}${user?.profileImage?.idImage}`) || ("//ssl.gstatic.com/accounts/ui/avatar_2x.png")}
    //           alt=""
    //           sx={{ width: 180, height: 180, margin: '0 auto'}}
    //         />
    //         <UserUpdateAvatar/>
    //         <Typography variant="h5" textAlign='center' marginTop={4} marginBottom={4}>
    //           {user?.firstname} {user?.lastname}
    //         </Typography>
    //         {!editing ?
    //           (<Button
    //             variant="outlined"
    //             color="primary"
    //             onClick={() => {
    //                 setEditing(!editing);
    //                 setEditingAddress(editing);
    //               }
    //             }
    //             startIcon={<AutoFixHighIcon/>}
    //             style={{ border: 'none', textTransform: 'none' }}
    //           >
    //             Chỉnh sửa thông tin
    //           </Button>) : (<></>)
    //         }
    //         {!editingAddress ?
    //           (<Button
    //             variant="outlined"
    //             color="primary"
    //             onClick={() => {
    //                 setEditingAddress(!editingAddress);
    //                 setEditing(editingAddress);
    //               }
    //             }
    //             startIcon={<EditLocationIcon/>}
    //             style={{ border: 'none', textTransform: 'none' }}
    //           >
    //             Chỉnh sửa địa chỉ
    //           </Button>) : (<></>)
    //         }
    //       </Grid>
    //       <Grid item xs={12} sm={4}> 
    //         <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#efefef' }}>
    //           <Grid container alignItems="center" spacing={2}>
    //             <Grid item>
    //               <List component="nav">
    //                 <ListItem>
    //                     <ListItemText primary="Họ và tên:" secondary={`${user?.firstname} ${user?.lastname}`} />
    //                 </ListItem>
    //                 <Divider />
    //                 <ListItem>
    //                     <ListItemText primary="Tên đăng nhập:" secondary={user?.username} />
    //                 </ListItem>
    //                 <Divider />
    //                 <ListItem>
    //                     <ListItemText primary="Email:" secondary={user?.email} />
    //                 </ListItem>
    //                 <Divider />
    //                 <ListItem>
    //                     <ListItemText primary="Số điện thoại:" secondary={user.addresses && user.addresses.length > 0 ? (user?.addresses[user?.addresses?.length - 1]?.phone) : "Chưa cập nhật số điện thoại"} />
    //                 </ListItem>
    //                 <Divider />
    //                 <ListItem>
    //                     <ListItemText primary="Địa chỉ nhận hàng:" secondary={user.addresses && user.addresses.length > 0 ? (user?.addresses[user?.addresses?.length - 1]?.fulladdress) : "Chưa cập nhật địa chỉ"} />
    //                 </ListItem>
    //                 <Link to={'/address_all'}>
    //                   <Typography variant="h8">
    //                     Thêm địa chỉ mới
    //                   </Typography> 
    //                 </Link>
    //               </List>
    //             </Grid>
    //           </Grid>
    //         </Paper>
    //       </Grid>
    //       <Grid item xs={12} sm={6} alignItems="center">
    //         { editing && (<UserInformationForm user={user} onUpdate={handleUpdate} editing={editing} setEditing={setEditing}/>) }
    //         { editingAddress && 
    //         (
    //           <>
    //             <Typography variant='h5' marginBottom={4}>Địa chỉ liên hệ của bạn</Typography>
    //             <UpdateAdressUser user={user} onUpdate={handleUpdate} editingAddress={editingAddress} setEditingAddress={setEditingAddress}/>
    //           </>
    //         ) }
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </Grid>
    // </Container>
    <Container>
      <Grid container alignItems="center" spacing={2} sx={{marginBottom: "8px"}}>
        <Grid item xs={12} sm={12} md={2}>
          <Avatar
            // src={user?.profileImage?.idImage ? `${API_IMAGE}${user?.profileImage?.idImage}` : "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
            src={avatarSrc}
            alt=""
            sx={{ width: 180, height: 180, margin: '0 auto' }}
          />
          <UserUpdateAvatar onUpdate={handleUpdate}/>
          <Typography variant="h5" textAlign="center" marginTop={4} marginBottom={4}>
            {user?.firstname} {user?.lastname}
          </Typography>
          {!editing ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setEditing(!editing);
                setEditingAddress(editing);
                setInfoInvoice(editing);
              }}
              startIcon={<AutoFixHighIcon />}
              style={{ border: 'none', textTransform: 'none' }}
            >
              Chỉnh sửa thông tin
            </Button>
          ) : (
            <></>
          )}
          {(!editingAddress && user?.addresses?.length > 0) ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setEditingAddress(!editingAddress);
                setEditing(editingAddress);
                setInfoInvoice(editingAddress);
              }}
              startIcon={<EditLocationIcon />}
              style={{ border: 'none', textTransform: 'none' }}
            >
              Chỉnh sửa địa chỉ
            </Button>
          ) : (
            <></>
          )}
          { !infoInvoice ?
            (<Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setInfoInvoice(!infoInvoice);
                  setEditing(infoInvoice);
                  setEditingAddress(infoInvoice);
                }}
                startIcon={<HistoryOutlinedIcon />}
                style={{ border: 'none', textTransform: 'none' }}
              >
                Lịch sử đơn hàng
            </Button>)
            : (<></>)
          }
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#efefef' }}>
            <List component="nav">
              <ListItem>
                <ListItemText primary="Họ và tên:" secondary={`${user?.firstname} ${user?.lastname}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Tên đăng nhập:" secondary={user?.username} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email:" secondary={user?.email} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Số điện thoại:"
                  secondary={user?.addresses && user?.addresses?.length > 0 ? user?.addresses[user?.addresses?.length - 1]?.phone : "Chưa cập nhật số điện thoại"}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Địa chỉ nhận hàng:"
                  secondary={user?.addresses && user?.addresses?.length > 0 ? user?.addresses[user?.addresses?.length - 1]?.fulladdress : "Chưa cập nhật địa chỉ"}
                />
              </ListItem>
              <Link to={'/address_all'}>
                <Typography variant="h8">Thêm địa chỉ mới</Typography>
              </Link>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} alignItems="center">
          {editing && (<UserInformationForm user={user} onUpdate={handleUpdate} editing={editing} setEditing={setEditing} />)}
          {editingAddress &&
              (<UpdateAdressUser user={user} onUpdate={handleUpdate} editingAddress={editingAddress} setEditingAddress={setEditingAddress} />)
            
          }
          {infoInvoice && (<UserHistoryInvoice user={user}/>)}

        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
