import { useState } from 'react';
import './Contact.css';

const initialForm = {
    cep: '',
    street: '',
    neighborhood: '',
    state: '',
    city: '',
    number: '',
    message: ''
};

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState({ type: '', message: '' });

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    }

    async function searchCep() {
        const cleanCep = form.cep.replace(/\D/g, '');

        if (cleanCep.length !== 8) {
            setStatus({ type: 'error', message: 'Digite um CEP válido!' });
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

            if (!response.ok) {
                throw new Error('Falha na busca do CEP');
            }

            const address = await response.json();

            if (address.erro) {
                throw new Error('CEP não encontrado');
            }

            setForm((current) => ({
                ...current,
                street: address.logradouro || '',
                neighborhood: address.bairro || '',
                state: address.uf || '',
                city: address.localidade || ''
            }));

            setStatus({ type: 'success', message: 'Endereço encontrado!' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    }

    return (
        <section className="contact-page">
            <span className="section-label">Fale com a gente</span>
            <h1>Entre em contato</h1>
            <p className="page-intro">Consulte o CEP para completar seu endereço e escolha uma cidade carregada pela API do IBGE.</p>
            <form className="contact-form">
                <div className="form-section">
                    <h2>Endereço</h2>
                    <div className="form-grid">
                        <label>
                            CEP
                            <div className="cep-field">
                                <input
                                    name="cep"
                                    inputMode="numeric"
                                    value={form.cep}
                                    onChange={handleChange}
                                    placeholder="000-000"
                                />
                                <button type="button" onClick={searchCep}>
                                    Buscar
                                </button>
                            </div>
                        </label>
                        <label>
                            Estado
                            <select name="state" value={form.state} onChange={handleChange}>
                                {form.state ? (
                                    <option value={form.state}>{form.state}</option>
                                ) : (
                                    <option value="">Selecione</option>
                                )}
                            </select>
                        </label>
                        <label>
                            Cidade
                            <select name="city" value={form.city} onChange={handleChange}>
                                {form.city ? (
                                    <option value={form.city}>{form.city}</option>
                                ) : (
                                    <option value="">Selecione</option>
                                )}
                            </select>
                        </label>
                        <label>
                            Rua
                            <input
                                name="street"
                                value={form.street}
                                onChange={handleChange}
                                placeholder="Nome da rua"
                            />
                        </label>
                        <label>
                            Número
                            <input
                                name="number"
                                value={form.number}
                                onChange={handleChange}
                                placeholder="123"
                            />
                        </label>
                        <label>
                            Bairro
                            <input
                                name="neighborhood"
                                value={form.neighborhood}
                                onChange={handleChange}
                                placeholder="Seu bairro"
                            />
                        </label>
                    </div>
                </div>
                <label>
                    Mensagem
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Como podemos ajudar?"
                    />
                </label>
                {status.message && (
                    <p className={status.type === 'error' ? 'form-error' : 'form-success'}>{status.message}</p>
                )}
                <button className="submit-button" type="submit">Enviar mensagem</button>
            </form>
        </section>
    );
}


