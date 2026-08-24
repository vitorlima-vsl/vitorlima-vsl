# Expresso Livre 2.5.2 — Instalação local (WAMP + PostgreSQL)

Guia passo a passo para rodar o **Expresso Livre** (eGroupWare) em ambiente Windows com **WAMP**, **PHP 7.4** e **PostgreSQL 18**.

---

## Requisitos

| Componente | Versão testada |
|------------|----------------|
| Windows | 10/11 |
| WAMP | 64 bits (Apache 2.4.x) |
| PHP | **7.4.x** (não use 8.x) |
| PostgreSQL | 18 (ou 14+) |
| DBeaver | qualquer versão recente |
| 7-Zip | para extrair o código-fonte |

**Caminho padrão usado neste guia:** `C:\wamp64\www\webmail`

**URL de acesso:** `http://127.0.0.1/webmail/` (use `127.0.0.1`, não `localhost`, se houver proxy corporativo)

---

## 1. Baixar o Expresso Livre

1. Repositório oficial: [ComunidadeExpresso/expressolivre](https://github.com/ComunidadeExpresso/expressolivre)
2. Baixe o ZIP da branch `master` ou use a release **v2.5.2**
3. Extraia para `C:\wamp64\www\webmail`

> **Dica:** `git clone` no Windows pode falhar por causa do arquivo `aux.sh` (nome reservado). Use ZIP + 7-Zip se necessário.

Confirme que existem, entre outros:

- `login.php`
- `setup/index.php`
- `phpgwapi/`
- `header.inc.php.template`

---

## 2. Instalar e configurar o PostgreSQL

### 2.1 Criar banco e usuário (DBeaver ou psql)

```sql
CREATE USER expresso WITH PASSWORD 'sua_senha_aqui';

CREATE DATABASE expresso
  WITH OWNER = expresso
  ENCODING = 'LATIN1'
  LC_COLLATE = 'Portuguese_Brazil.1252'
  LC_CTYPE = 'Portuguese_Brazil.1252'
  TEMPLATE = template0;

GRANT ALL PRIVILEGES ON DATABASE expresso TO expresso;
```

> **Por que LATIN1?** Os arquivos de idioma do Expresso 2.5.2 usam ISO-8859-1. Com PostgreSQL em UTF-8 puro, a instalação de idiomas (`phpgw_lang`) costuma falhar silenciosamente.

Se o banco já existir em UTF-8:

```sql
ALTER DATABASE expresso SET client_encoding TO 'LATIN1';
```

Reconecte no DBeaver após alterar o encoding.

### 2.2 Dados de conexão (anote para o setup)

| Campo | Valor |
|-------|-------|
| Host | `127.0.0.1` |
| Porta | `5432` |
| Banco | `expresso` |
| Usuário | `expresso` |
| Senha | a que você definiu |
| Tipo | `pgsql` |

---

## 3. Configurar o WAMP (PHP + Apache)

### 3.1 Ativar PHP 7.4

No ícone do WAMP → **PHP** → **Version** → selecione **7.4.x**.

### 3.2 Editar `php.ini`

Arquivo típico: `C:\wamp64\bin\php\php7.4.33\php.ini`

```ini
display_errors = Off
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT

max_execution_time = 600
memory_limit = 256M

; Extensões necessárias (remova ; se estiver comentado)
extension=pgsql
extension=pdo_pgsql
extension=ldap
extension=mbstring
extension=gd2
extension=curl
```

Reinicie o Apache após salvar.

### 3.3 Pastas de dados (fora do `www`)

Crie:

```
C:\wamp64\tmp
C:\wamp64\webmail-data
```

Use esses caminhos na configuração do Passo 2 do setup.

---

## 4. Configurador web (setup)

Abra no navegador:

```
http://127.0.0.1/webmail/setup/
```

### Passo 0 — Header / domínio

1. Acesse **Configurar o Menu Principal** (login do setup)
2. Gere o `header.inc.php` apontando para o PostgreSQL
3. Confirme que `C:\wamp64\www\webmail\header.inc.php` foi criado

Se faltar `header.inc.php.template`, copie do repositório ou recrie a partir do modelo oficial.

### Passo 1 — Instalar aplicações

Clique em instalar/atualizar aplicações. Erros de `phpgw_lang` podem aparecer aqui; o passo ainda pode concluir.

### Passo 2 — Configuração

Abra **Editar configuração atual** (`setup/config.php`) e configure:

| Campo | Valor sugerido |
|-------|----------------|
| Authentication type | **SQL** (desenvolvimento local) |
| temp_dir | `C:\wamp64\tmp` |
| files_dir | `C:\wamp64\webmail-data` |
| webserver_url | `/webmail` |
| use_https | `0` |
| usecookies | `True` |

Salve até o Passo 2 ficar verde (`is_configured = true`).

**Bypass via SQL** (se o formulário não salvar):

```sql
INSERT INTO phpgw_config (config_app, config_name, config_value)
VALUES ('phpgwapi', 'is_configured', 'true')
ON CONFLICT DO NOTHING;

UPDATE phpgw_config SET config_value = 'true'
WHERE config_app = 'phpgwapi' AND config_name = 'is_configured';
```

### Passo 3 — Conta administrador

1. **Criar conta de administrador** → `setup/admin.php`
2. Usuário: `expresso-admin`
3. Defina e anote a senha

Para ambiente local com **SQL auth**, não é necessário LDAP.

### Passo 4 — Idioma

1. **Instalar idioma** → `setup/lang.php`
2. Selecione **Brasil** na lista (deve ficar destacado)
3. Método: **Remover todos os idiomas antigos e instalar novos**
4. Clique em **Instalar** (não apenas no nome do idioma)

Confirme no banco:

```sql
SELECT COUNT(*) FROM phpgw_lang;
SELECT DISTINCT lang FROM phpgw_lang;
```

### Passo 5 — Charset

Clique em **aqui** no aviso de charset ou abra `setup/system_charset.php`:

- **system_charset:** `iso-8859-1`

---

## 5. Correções obrigatórias (patches)

Sem estes ajustes, instalação de idioma, login ou sessão podem falhar no WAMP + PostgreSQL.

### 5.1 Formulário de idioma — `setup/templates/default/lang_main.tpl`

O botão **Instalar** ficava fora do `<form>`. Envolva tabela + botões em um único form:

```html
<form method="POST" action="lang.php">
{hidden_var1}
<table>...</table>
<div align="center">
  <input type="submit" name="submit" value="{lang_install}">
  <input type="submit" name="cancel" value="{lang_cancel}">
</div>
</form>
```

Remova o `<form>` que estava dentro do primeiro `<td>`.

### 5.2 Sessão PHP — `phpgwapi/inc/class.sessions_php4.inc.php`

**Bug:** `new_session_id()` não iniciava a sessão (`sessionid` vazio no log).

Substitua `new_session_id()`:

```php
function new_session_id()
{
    if ( session_status() == PHP_SESSION_NONE )
    {
        session_start();
    }
    return session_id();
}
```

Substitua `set_cookie_params()`:

```php
function set_cookie_params($domain)
{
    $path = '/webmail/';
    if (!empty($GLOBALS['phpgw_info']['server']['webserver_url']))
    {
        $path = rtrim($GLOBALS['phpgw_info']['server']['webserver_url'], '/') . '/';
    }
    session_set_cookie_params(0, $path, $domain);
}
```

### 5.3 Cookies e PostgreSQL — `phpgwapi/inc/class.sessions.inc.php`

Em `log_access()` e `login_blocked()`, troque `pg_escape_string()` por `$GLOBALS['phpgw']->db->db_addslashes()`.

Substitua `phpgw_setcookie()`:

```php
function phpgw_setcookie($cookiename, $cookievalue = '', $cookietime = 0)
{
    if (!$this->cookie_domain)
    {
        $this->phpgw_set_cookiedomain();
    }
    $path = '/webmail/';
    if (!empty($GLOBALS['phpgw_info']['server']['webserver_url']))
    {
        $path = rtrim($GLOBALS['phpgw_info']['server']['webserver_url'], '/') . '/';
    }
    setcookie($cookiename, $cookievalue, $cookietime, $path, $this->cookie_domain);
}
```

### 5.4 Outros patches conhecidos

| Arquivo | Problema | Correção |
|---------|----------|----------|
| `setup/manageheader.php` | HTTP 500 — `default:` duplicado no `switch` do captcha | Remover bloco duplicado |
| `setup/config.php` | Tela branca — `get_db_versions()` sem array | Chamar `get_versions()` antes de `get_db_versions()` |
| `setup/inc/hook_config.inc.php` | Mcrypt ausente no PHP 7.4 bloqueia save | Retornar `tripledes`/`cbc` quando mcrypt não existir |

Reinicie o Apache após qualquer alteração.

---

## 6. Login

```
http://127.0.0.1/webmail/login.php
```

| Campo | Valor |
|-------|-------|
| Usuário | `expresso-admin` |
| Senha | a definida no Passo 3 |

Redefinir senha via SQL (MD5):

```sql
UPDATE phpgw_accounts
SET account_pwd = md5('admin123'),
    account_status = 'A',
    account_expires = -1
WHERE account_lid = 'expresso-admin';
```

Senha nesse exemplo: `admin123`

---

## 7. Verificação pós-instalação

### Configuração

```sql
SELECT config_name, config_value
FROM phpgw_config
WHERE config_name IN ('auth_type', 'is_configured', 'webserver_url', 'usecookies');
```

Esperado: `auth_type = sql`, `is_configured = true`, `webserver_url = /webmail`.

### Login funcionando

Após logar, o log deve ter `sessionid` preenchido:

```sql
SELECT sessionid, loginid, account_id, ip, li
FROM phpgw_access_log
ORDER BY li DESC
LIMIT 5;
```

- `account_id = 0` + `sessionid = bad login or password` → senha errada
- `account_id = 3` (ou id do admin) + `sessionid` com hash → login OK

### Logs de erro PHP

```
C:\wamp64\logs\php_error.log
```

---

## 8. Problemas comuns

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| `` na interface | Encoding ISO-8859-1 vs UTF-8 | Charset `iso-8859-1` + banco LATIN1 |
| Passo 4 vermelho após Instalar | Form quebrado ou encoding | Patch `lang_main.tpl` + LATIN1 |
| Login volta para tela inicial | Sessão vazia | Patch `class.sessions_php4.inc.php` |
| HTTP 500 no setup | PHP 7.4 + código antigo | Ver `php_error.log`, aplicar patches |
| Proxy bloqueia download | Rede corporativa | Baixar ZIP pelo navegador/7-Zip |
| Mcrypt obrigatório no config | Extensão removida no PHP 7.4 | Patch `hook_config.inc.php` |

---

## 9. Estrutura de arquivos importantes

```
C:\wamp64\www\webmail\
├── header.inc.php              # Gerado pelo setup (domínio/DB)
├── header.inc.php.template
├── login.php
├── home.php
├── setup\
│   ├── index.php               # Assistente principal
│   ├── config.php
│   ├── admin.php
│   ├── lang.php
│   └── templates\default\
│       └── lang_main.tpl       # Patch do form de idioma
└── phpgwapi\inc\
    ├── class.sessions.inc.php          # Patch cookies + pg_escape
    └── class.sessions_php4.inc.php     # Patch session_start
```

---

## 10. Checklist rápido

- [ ] WAMP com PHP **7.4** ativo
- [ ] PostgreSQL com banco `expresso` (LATIN1)
- [ ] Código em `C:\wamp64\www\webmail`
- [ ] `header.inc.php` gerado
- [ ] Setup: Passos 1–5 verdes
- [ ] Patches de sessão e idioma aplicados
- [ ] Login em `http://127.0.0.1/webmail/login.php`
- [ ] `phpgw_access_log` com `sessionid` preenchido após login

---

## Referências

- [Expresso Livre — repositório oficial](https://github.com/ComunidadeExpresso/expressolivre)
- [eGroupWare / Expresso Livre 2.5.2](http://www.expressolivre.org/)
- Documentação histórica: eGroupWare 1.x / phpGroupWare API

---

**Versão do guia:** Expresso Livre 2.5.2 · WAMP · PHP 7.4 · PostgreSQL 18 · Windows
