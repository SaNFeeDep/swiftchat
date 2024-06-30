import { useState } from 'react'
import styled from 'styled-components'
import { Avatar, Button, Checkbox, Input } from '../shared'
import { MessageMenu } from '../widgets/message-menu'
import loadAssets from './lib/loadAssets'
import { ThemeSwitcher } from './providers'

const App = () => {
  loadAssets()
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Input />
      <Button onClick={() => setOpen((p) => !p)}>Тест</Button>
      <Avatar src='https://pm1.aminoapps.com/6750/dddd7fbf857879e7a4513d20a85c1c89d5d74a41v2_hq.jpg' />
      <MessageMenu open={open} onClick={() => {}} />
      {/* <Header />

      <Main>
        <Routes>
          {RoutesArray.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={typeof element === 'function' ? element() : element}
            />
          ))}
        </Routes>
      </Main>

      <Footer /> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
`
const AppWithProvider = () => (
  <ThemeSwitcher>
    <App />
  </ThemeSwitcher>
)

export default AppWithProvider
