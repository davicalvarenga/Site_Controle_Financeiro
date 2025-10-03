// Sistema de Controle Financeiro Pessoal
class ControlFinanceiro {
    constructor() {
        this.perfilRisco = 'moderado';
        this.sugestoesCache = new Map();
    }

    // Função principal para calcular orçamento
    calcularOrcamento() {
        const salario = parseFloat(document.getElementById('salario').value);
        
        if (!salario || salario <= 0) {
            alert('💰 Por favor, digite um salário válido!');
            return;
        }

        // Cálculos baseados nas porcentagens do método 50/15/10/10/15
        const necessidades = salario * 0.55;    // 55%
        const liberdade = salario * 0.15;       // 15%
        const educacao = salario * 0.10;        // 10%
        const estabilidade = salario * 0.10;    // 10%
        const lazer = salario * 0.10;           // 10%

        // Atualiza os valores na tela
        this.atualizarValores(necessidades, liberdade, educacao, estabilidade, lazer);

        // Mostra os resultados com animação
        const resultados = document.getElementById('resultados');
        resultados.style.display = 'block';
        
        // Determina perfil do usuário baseado no salário
        this.determinarPerfil(salario);
        
        // Gera sugestões de investimento
        this.gerarSugestoes(liberdade, salario);
        
        // Scroll suave para os resultados
        resultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    atualizarValores(necessidades, liberdade, educacao, estabilidade, lazer) {
        document.getElementById('necessidades').textContent = this.formatarMoeda(necessidades);
        document.getElementById('liberdade').textContent = this.formatarMoeda(liberdade);
        document.getElementById('educacao').textContent = this.formatarMoeda(educacao);
        document.getElementById('estabilidade').textContent = this.formatarMoeda(estabilidade);
        document.getElementById('lazer').textContent = this.formatarMoeda(lazer);
    }

    determinarPerfil(salario) {
        if (salario <= 2000) {
            this.perfilRisco = 'conservador';
        } else if (salario <= 5000) {
            this.perfilRisco = 'moderado';
        } else {
            this.perfilRisco = 'agressivo';
        }
        
        document.getElementById('perfil-usuario').textContent = 
            this.perfilRisco.charAt(0).toUpperCase() + this.perfilRisco.slice(1);
    }

    gerarSugestoes(valorInvestimento, salarioTotal) {
        const sugestoes = this.obterSugestoesPorPerfil(valorInvestimento, salarioTotal);
        this.exibirSugestoes(sugestoes);
        this.exibirDicaPersonalizada();
        
        // Mostra a seção de sugestões
        document.getElementById('sugestoes-investimento').style.display = 'block';
    }

    obterSugestoesPorPerfil(valor, salario) {
        const sugestoes = [];

        switch (this.perfilRisco) {
            case 'conservador':
                sugestoes.push(
                    {
                        nome: "🏦 CDB Banco (70%)",
                        valor: valor * 0.70,
                        risco: "Baixo",
                        descricao: "Certificado de Depósito Bancário com proteção do FGC até R$ 250 mil. Ideal para começar a investir com segurança.",
                        rentabilidade: "100% a 110% do CDI"
                    },
                    {
                        nome: "🏛️ Tesouro Selic (25%)",
                        valor: valor * 0.25,
                        risco: "Baixo",
                        descricao: "Tesouro Nacional que acompanha a taxa Selic. Liquidez diária e sem risco de crédito.",
                        rentabilidade: "Taxa Selic"
                    },
                    {
                        nome: "💰 Poupança Plus (5%)",
                        valor: valor * 0.05,
                        risco: "Baixo",
                        descricao: "Para emergências imediatas. Mantenha sempre um valor disponível para imprevistos.",
                        rentabilidade: "0,5% ao mês + TR"
                    }
                );
                break;

            case 'moderado':
                sugestoes.push(
                    {
                        nome: "📈 LCI/LCA (40%)",
                        valor: valor * 0.40,
                        risco: "Baixo",
                        descricao: "Letras de Crédito com isenção de Imposto de Renda e proteção do FGC. Excelente custo-benefício.",
                        rentabilidade: "95% a 105% do CDI"
                    },
                    {
                        nome: "🏢 BOVA11 - ETF Bovespa (30%)",
                        valor: valor * 0.30,
                        risco: "Médio",
                        descricao: "ETF que replica o Ibovespa. Diversificação em ações das maiores empresas do Brasil com baixa taxa de administração.",
                        rentabilidade: "Acompanha Ibovespa"
                    },
                    {
                        nome: "🌟 Fundos Multimercado (20%)",
                        valor: valor * 0.20,
                        risco: "Médio",
                        descricao: "Fundos geridos por especialistas que investem em diversos ativos para maximizar retorno.",
                        rentabilidade: "CDI + 2% a 5% ao ano"
                    },
                    {
                        nome: "🏦 CDB Premium (10%)",
                        valor: valor * 0.10,
                        risco: "Baixo",
                        descricao: "Reserve uma parte em renda fixa para estabilizar a carteira em momentos de volatilidade.",
                        rentabilidade: "110% a 130% do CDI"
                    }
                );
                break;

            case 'agressivo':
                sugestoes.push(
                    {
                        nome: "💎 Ações Individuais (35%)",
                        valor: valor * 0.35,
                        risco: "Alto",
                        descricao: "Invista em empresas sólidas como Itaú (ITUB4), Petrobras (PETR4), Vale (VALE3). Foque em empresas com bons fundamentos.",
                        rentabilidade: "10% a 25% ao ano"
                    },
                    {
                        nome: "🌎 ETFs Diversificados (25%)",
                        valor: valor * 0.25,
                        risco: "Médio-Alto",
                        descricao: "BOVA11 (Bovespa), IVVB11 (S&P 500), HASH11 (Nasdaq). Diversificação nacional e internacional.",
                        rentabilidade: "8% a 20% ao ano"
                    },
                    {
                        nome: "🏗️ Fundos Imobiliários (20%)",
                        valor: valor * 0.20,
                        risco: "Médio",
                        descricao: "FIIs como HGLG11, KNRI11, XPLG11. Renda passiva mensal através de aluguéis de imóveis comerciais.",
                        rentabilidade: "6% a 12% ao ano + dividendos"
                    },
                    {
                        nome: "🛡️ Tesouro IPCA+ (15%)",
                        valor: valor * 0.15,
                        risco: "Baixo-Médio",
                        descricao: "Proteção contra inflação para preservar poder de compra no longo prazo.",
                        rentabilidade: "IPCA + 4% a 6% ao ano"
                    },
                    {
                        nome: "💰 Reserva Tática (5%)",
                        valor: valor * 0.05,
                        risco: "Baixo",
                        descricao: "Liquidez imediata para aproveitar oportunidades ou emergências.",
                        rentabilidade: "100% CDI"
                    }
                );
                break;
        }

        return sugestoes;
    }

    exibirSugestoes(sugestoes) {
        const container = document.getElementById('lista-sugestoes');
        container.innerHTML = '';

        sugestoes.forEach((sugestao, index) => {
            const div = document.createElement('div');
            div.className = 'sugestao-item';
            div.style.animationDelay = `${index * 0.1}s`;
            
            const riscoClass = sugestao.risco.toLowerCase().replace('-', '');
            
            div.innerHTML = `
                <h3>${sugestao.nome}</h3>
                <div class="valor">R$ ${this.formatarMoeda(sugestao.valor)}</div>
                <span class="risco risco-${riscoClass.replace(' ', '')}">${sugestao.risco}</span>
                <p><strong>Rentabilidade esperada:</strong> ${sugestao.rentabilidade}</p>
                <p>${sugestao.descricao}</p>
            `;
            container.appendChild(div);
        });
    }

    exibirDicaPersonalizada() {
        const dicas = {
            conservador: [
                "🎯 Comece sempre pela reserva de emergência de 6 meses de gastos!",
                "📚 Estude sobre renda fixa antes de partir para investimentos mais arriscados.",
                "💡 CDB e LCI/LCA são ótimas opções para quem está começando a investir."
            ],
            moderado: [
                "⚖️ Diversificação é fundamental! Não coloque todos os ovos na mesma cesta.",
                "📊 Acompanhe seus investimentos mensalmente, mas não se desespere com volatilidade.",
                "🎯 Considere aumentar gradualmente a parcela em renda variável conforme ganhe experiência."
            ],
            agressivo: [
                "🚀 Com grande potencial de retorno vem grande responsabilidade. Estude muito!",
                "📈 Mantenha sempre uma reserva em renda fixa para não precisar vender ações em momentos ruins.",
                "🧠 Invista apenas em empresas que você entende o negócio."
            ]
        };

        const dicasArray = dicas[this.perfilRisco];
        const dicaAleatoria = dicasArray[Math.floor(Math.random() * dicasArray.length)];
        document.getElementById('dica-personalizada').textContent = dicaAleatoria;
    }

    formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

// Instância global do sistema
const controlFinanceiro = new ControlFinanceiro();

// Função global para ser chamada pelo HTML
function calcularOrcamento() {
    controlFinanceiro.calcularOrcamento();
}

// Permite calcular ao pressionar Enter
document.addEventListener('DOMContentLoaded', function() {
    const salarioInput = document.getElementById('salario');
    salarioInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calcularOrcamento();
        }
    });
});
