import React, { useState } from 'react'

import Form, { Input, Item, Switch } from 'react-og-forms'

function Index() {
  const [blocked, setBlocked] = useState(true)

  return (
    <Form>
      <Item>
        Nome
        <Input value='OG Form' />
      </Item>
      <Item>
        E-Mail
        <Input type='email' value='odenirdev@gmail.com' status={true} />
      </Item>
      <Item>
        <Input
          placeholder='Confirmar senha'
          type='password'
          value='GFEDCBA'
          status={false}
        />
      </Item>
      <Item>
        <Switch
          label='Bloqueado'
          value={blocked}
          onChange={(value) => setBlocked(value)}
        />
      </Item>
    </Form>
  )
}

export default Index
