import React from 'react';
import "./GridList.css"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Avatar } from '@mui/material';
import { ListItemText, Box, Badge, Divider } from '@mui/material';

function Gridlist() {
  
  const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchAPI();
    }, []);

    const fetchAPI = async() => {
        try{
         const res = await fetch("https://reqres.in/api/users?page=2");
         const response = await res.json();
         const data = response.data;
         setUsers(data);
        }
        catch(error) {
          console.log(error);
         }
        }
    
        
    const [searchFName, setSearchFName] = useState("");
    const handleSearch = (event) => {
      setSearchFName(event.target.value);
    }
    

    const filteredEmployees = users.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchFName.toLowerCase())
     );

     const groupedEmployees = filteredEmployees.reduce((acc, employee) => {
      const firstLetter = employee.first_name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(employee);
      return acc;
    }, {});



  return (
    <>
    <div className="fluid-container">
    <Container maxWidth="md" sx={{ marginTop: '5rem', backgroundColor:'#0f103c'}}>
    <Grid container spacing={2} >
    <Grid item xs={12} sx={{backgroundColor:"#0f103c", paddingBottom:'70px'}}>
          <TextField
            fullWidth
            InputProps={{
              disableUnderline: true,
            }}
            variant="filled"
            label="Search by first name"
            value={searchFName}
            onChange={handleSearch}
            InputLabelProps= { {style : {color : '#fff', backgroundColor:'#143362'} }}
            sx={{
                height:'70px',
                backgroundColor:'#143362',
                border: '1px solid #2baec5',
                borderRadius:'30px',
                paddingBottom:'50px',
                input: { color: '#fff' }
              }}
          />
        </Grid>
        {users.length > 0 && (
          <ul>
        {filteredEmployees.map(user => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <List>
            <ListItem>
             <Box sx={{ border: '3px solid #262970', borderRadius: '50px', margin: '10px', padding:'10px', background:'#0f103c' }}>
             <Badge 
              badgeContent={user.id} 
              anchorOrigin={{vertical: 'top', horizontal: 'right'}} 
              sx={{"& .MuiBadge-badge": {fontSize:"20px",border: '2px solid #2baec5', height: '50px', minWidth: '50px', borderRadius: '50%', color: "#0a0c33", backgroundColor: "#2baec5"}}
              }>
              <Avatar 
                src={user.avatar} 
                alt={user.first_name} 
                variant="square"  
                sx={{
                    width: 290,
                    height: 220,
                    borderRadius: '50px',
                    margin: '12px',
                    border: '3px solid #262970',
                  }}
              /></Badge>
              </Box>
            </ListItem>
           
              <ListItemText id={user.id} primaryTypographyProps={{fontSize: '26px', color:'#fff'}}  primary={user.first_name} 
              sx={{paddingLeft:'10px', paddingBottom:'60px', textAlign: 'center', }} >
              </ListItemText>
            
            
          </List>  
          </Grid>
        ))}
          </ul>
      )}
    </Grid>
    </Container>
    </div>
    </>
  );
}

export default Gridlist;
