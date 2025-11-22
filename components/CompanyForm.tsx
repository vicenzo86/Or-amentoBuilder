
import React, { useRef } from 'react';
import { CompanyData } from '../types';
import { Upload, Building2, Phone, Mail, MapPin, UserPen } from 'lucide-react';

interface CompanyFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof CompanyData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 size={20} />
          Dados da Sua Empresa
        </h3>
        <p className="text-sm text-gray-500 mb-6">
            Estas informações aparecerão no cabeçalho de todos os orçamentos gerados.
        </p>

        <div className="grid grid-cols-1 gap-6">
            {/* Logo Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {data.logoUrl ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                        <img src={data.logoUrl} alt="Company Logo" className="max-w-full max-h-full object-contain" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                             <span className="bg-white text-xs px-2 py-1 rounded shadow opacity-0 hover:opacity-100">Alterar Logo</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400">
                        <Upload size={48} className="mx-auto mb-2" />
                        <span className="text-sm font-medium">Clique para fazer upload da Logo</span>
                        <span className="text-xs block mt-1">Recomendado: PNG ou JPG (Fundo transparente)</span>
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Nome da Empresa</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 size={16} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        placeholder="Ex: HidroSoluções Engenharia"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Endereço Completo</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <MapPin size={16} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Telefone Geral</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            placeholder="(00) 00000-0000"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email Geral / Vendas</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={data.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            placeholder="vendas@suaempresa.com"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
         <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <UserPen size={20} />
            Dados do Responsável / Assinatura
        </h3>
         <div className="grid grid-cols-1 gap-4">
             <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Nome do Responsável</label>
                <input
                    type="text"
                    value={data.signatoryName}
                    onChange={(e) => updateField('signatoryName', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    placeholder="Ex: Eng Vicenzo Agustini"
                />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Celular / Telefone Direto</label>
                    <input
                        type="text"
                        value={data.mobile}
                        onChange={(e) => updateField('mobile', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        placeholder="+ 55 (47) ..."
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email Pessoal / Direto</label>
                    <input
                        type="text"
                        value={data.secondaryEmail}
                        onChange={(e) => updateField('secondaryEmail', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                        placeholder="nome@empresa.com.br"
                    />
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default CompanyForm;
