import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Container, Content, FlexboxGrid, Form, Panel, Schema } from 'rsuite';
import { LoginUser } from '../tipovi';
import styles from '../App.module.css';
import classNames from 'classnames';

const model = Schema.Model({
  username: Schema.Types.StringType().isRequired(),
  password: Schema.Types.StringType().isRequired(),
});

interface Props {
  onSubmit: (u: LoginUser) => Promise<void>
}

export default function LoginPage(props: Props) {
  const [forma, setForma] = useState<LoginUser>({
    username: '',
    password: ''
  });
  return (
    <div
      className={classNames(styles['login-page'], 'show-fake-browser')}
    >
      <Container>
        <Content className={styles.spusteno}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel className={styles.gray} header={<h3>Login</h3>} bordered>
                <Form
                  formValue={forma}
                  model={model}
                  onChange={value => {
                    //@ts-ignore
                    setForma(value);
                  }}
                  onSubmit={(check) => {
                    if (!check) {
                      return;
                    }
                    props.onSubmit(forma);
                  }}
                  fluid>
                  <Form.Group>
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control name="username" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Sifra</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button type='submit' appearance="primary">Prijavite se</Button>
                      <Link to='/register'>
                        <Button type='button' appearance="link">Nemate nalog?</Button>
                      </Link>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}
