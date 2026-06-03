# Landing pages

## Projetos: Estrela do Sul + Santa Clara (Mateus Leme)

---

# Contexto
Precisamos desenvolver **duas landpages imobiliárias** focadas em captação e conversão:
- **Estrela do Sul**
- **Santa Clara**

Ambos os bairros ficam em **Mateus Leme — MG**.

As LPs devem seguir o direcionamento visual da **Avanz V2**, mantendo consistência com o ecossistema atual da marca.

---

# Objetivo das LPs
As páginas devem:
- Gerar leads qualificados via WhatsApp
- Posicionar a Avanz como curadora imobiliária
- Reduzir insegurança do comprador
- Destacar oportunidade de investimento e qualidade de vida
- Guiar o usuário até contato direto

---

# Direção de marca

## Conceito central
> **Entender para atender**

As LPs não devem parecer "portais genéricos de imóvel".
A comunicação precisa transmitir:
- clareza
- direção
- confiança
- orientação
- curadoria

---

# Público esperado

## ICP principal
Pessoa buscando:
- lote
- terreno
- sítio
- chácara
- investimento em terra
- saída do centro urbano

Região-alvo:
- RMBH
- Grande BH
- Mateus Leme
- Betim
- Contagem
- Belo Horizonte

---

# Sensações que a LP precisa passar
- "Isso parece seguro"
- "Finalmente alguém explicou direito"
- "Agora eu entendi a região"
- "Consigo falar direto com alguém"
- "Não estão me empurrando qualquer lote"

---

# Estrutura recomendada da LP

## Hero Section
Elementos esperados:
- headline forte
- subheadline orientada a decisão
- CTA de WhatsApp
- imagem aérea / loteamento / natureza
- badge de localização: Mateus Leme — MG

### Exemplo de direção

**Estrela do Sul:**
> Seu lote em Mateus Leme com direção certa pra investir ou morar.

**Santa Clara:**
> Mais espaço, tranquilidade e potencial de valorização perto da RMBH.

---

## Seção: Por que Mateus Leme?
Explicar:
- proximidade da RMBH
- crescimento da região
- qualidade de vida
- acesso
- valorização imobiliária
- tranquilidade

---

## Seção: Diferenciais do bairro/loteamento
Adicionar conforme material disponível:
- topografia
- acesso
- vista
- documentação
- financiamento
- infraestrutura
- água/luz
- potencial de valorização

---

## Seção: Processo Avanz
Mostrar a lógica de curadoria:
1. Entendemos seu objetivo
2. Indicamos as melhores opções
3. Explicamos riscos e vantagens
4. Acompanhamos a decisão

---

## CTA forte
Botão principal:
- WhatsApp
- "Quero entender melhor"
- "Falar com especialista"
- "Receber opções disponíveis"

---

# Design direction

## Referência principal — Site V2 (DEV)
[http://100.112.61.110:5100](http://100.112.61.110:5100/)

Essa é a principal referência visual da evolução da marca.

As LPs devem alinhar:
- paleta
- tipografia
- espaçamento
- componentes
- micro-interações
- feeling premium/moderno

---

# Referências de ambiente

## Site V2 — `avanzimoveis.com`

| Ambiente | URL                                                        | Objetivo                    |
|----------|------------------------------------------------------------|-----------------------------|
| Prod     | [http://100.112.61.110:5101](http://100.112.61.110:5101/) | Visual atualmente no ar     |
| Dev      | [http://100.112.61.110:5100](http://100.112.61.110:5100/) | Referência visual futura    |

## CRM V2 — `crm.avanzimoveis.com`

| Ambiente | Frontend                                                   | API                                                        |
|----------|------------------------------------------------------------|------------------------------------------------------------|
| Prod     | [http://100.112.61.110:5310](http://100.112.61.110:5310/) | [http://100.112.61.110:5300](http://100.112.61.110:5300/) |
| Dev      | [http://100.112.61.110:5210](http://100.112.61.110:5210/) | [http://100.112.61.110:5200](http://100.112.61.110:5200/) |

---

# Observações importantes

## Tailnet / acesso
A V2 roda em:
- `vps-jlemara`
- Tailnet IP: `100.112.61.110`

Pré-requisito:
- Tailscale instalado
- logado na conta autorizada

Download: [https://tailscale.com/download](https://tailscale.com/download)

---

# Checklist pro Igor
- [ ] Abrir Site V2 prod (`:5101`)
- [ ] Abrir Site V2 dev (`:5100`)
- [ ] Abrir CRM V2 prod (`:5310`)
- [ ] Abrir CRM V2 dev (`:5210`)
- [ ] Validar consistência visual
- [ ] Observar componentes reutilizáveis
- [ ] Validar paleta e micro-interações

---

# Diagnóstico de conexão
Se algum endpoint falhar:
```bash
tailscale status
```
