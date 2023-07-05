import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material"
import { Link as RouterLink, Outlet } from 'react-router-dom'

const PaginaBaseAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="/users/">
                <Button sx={{ my: 2, color: 'white' }}>
                  Usuarios
                </Button>
              </Link>
              <Link component={RouterLink} to="/users/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo usuario
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    
    
    </>
  )
}

export default PaginaBaseAdmin