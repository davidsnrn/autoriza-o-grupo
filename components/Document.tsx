import React, { useMemo } from 'react';
import { Student } from '../types';
import { IFRNLogo } from './IFRNLogo';
import { getFormattedDate } from '../utils';

interface DocumentProps {
  students: Student[];
}

// Reduzi levemente para garantir que caiba em 1 página com o novo espaço de assinatura
const ITEMS_PER_PAGE = 20;

export const Document: React.FC<DocumentProps> = ({ students }) => {
  const formattedDate = useMemo(() => getFormattedDate(), []);

  const pages = useMemo(() => {
    const chunks: Student[][] = [];
    const list = students.length > 0 ? students : [{ id: '', name: '' }];
    
    for (let i = 0; i < list.length; i += ITEMS_PER_PAGE) {
      chunks.push(list.slice(i, i + ITEMS_PER_PAGE));
    }
    return chunks;
  }, [students]);

  const totalPages = pages.length;

  return (
    <div className="flex flex-col gap-8 print:gap-0 print:block bg-transparent print:m-0 print:p-0">
      {pages.map((pageStudents, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === pages.length - 1;
        const pageNumber = pageIndex + 1;
        const startIndex = pageIndex * ITEMS_PER_PAGE;

        return (
          <div 
            key={pageIndex}
            className="bg-white w-[210mm] min-h-[290mm] px-[20mm] py-[15mm] mx-auto shadow-xl print:shadow-none print:w-full print:min-h-0 print:h-auto print:mx-0 print:p-0 relative flex flex-col box-border overflow-hidden mb-8 print:mb-0"
            style={{ 
              pageBreakAfter: isLastPage ? 'avoid' : 'always',
              breakAfter: isLastPage ? 'avoid' : 'page'
            }}
          >
            {/* Header */}
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 mr-4">
                <IFRNLogo className="w-[50px] h-[65px]" />
              </div>
              <div className="flex-grow text-[13px] leading-tight text-black font-normal">
                <p>Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte</p>
                <p className="font-bold">CAMPUS NOVA CRUZ</p>
                <p>Coordenação de Apoio Acadêmico (COAPAC)</p>
              </div>
            </div>

            {/* Títulos */}
            {isFirstPage && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-[17px] font-extrabold uppercase border-b-[2px] border-black inline-block pb-1 mb-2">
                    Autorização para Entrada em Sala de Aula
                  </h1>
                  <h2 className="text-[17px] font-extrabold uppercase">
                    Cadastro em Grupo
                  </h2>
                </div>

                <div className="border-[1.5px] border-black p-3 mb-6 text-center text-[12px] font-bold leading-snug">
                  Informo que os alunos listados abaixo compareceram à COAPAC para apresentar suas justificativas, as quais já foram verificadas e devidamente registradas.
                </div>
              </>
            )}

            {!isFirstPage && (
              <div className="text-center mb-6">
                <h2 className="text-[14px] font-bold uppercase text-gray-400">
                  (Continuação da Lista - Página {pageNumber})
                </h2>
              </div>
            )}

            {/* Tabela com bordas reforçadas */}
            <div className="w-full mb-8">
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-white">
                    <th className="border-[1.5px] border-black px-2 py-2 w-[10%] text-center uppercase font-bold">Nº</th>
                    <th className="border-[1.5px] border-black px-2 py-2 w-[25%] text-center uppercase font-bold">Matrícula</th>
                    <th className="border-[1.5px] border-black px-2 py-2 w-[65%] text-left uppercase font-bold">Aluno(a)</th>
                  </tr>
                </thead>
                <tbody>
                  {pageStudents.map((student, i) => (
                    <tr key={i}>
                      <td className="border-[1.5px] border-black px-2 py-1.5 text-center">
                        {student.name || student.id ? startIndex + i + 1 : ''}
                      </td>
                      <td className="border-[1.5px] border-black px-2 py-1.5 text-center font-mono">
                        {student.id}
                      </td>
                      <td className="border-[1.5px] border-black px-2 py-1.5 text-left uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                        {student.name || <span className="opacity-0">&nbsp;</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rodapé e Assinatura */}
            <div className="mt-auto">
              {isLastPage && (
                <div className="text-center">
                  <div className="italic text-[14px] mb-20">
                    {formattedDate}
                  </div>
                  
                  {/* Linha de Assinatura com bastante espaço acima */}
                  <div className="flex flex-col items-center">
                    <div className="w-[400px] border-t-[1.5px] border-black"></div>
                    <div className="mt-2 text-[14px] font-black uppercase tracking-widest">
                      Assistente de Alunos
                    </div>
                  </div>
                </div>
              )}

              {/* Paginação discreta */}
              {totalPages > 1 && (
                <div className="text-right mt-4 text-[10px] text-gray-400 print:text-gray-300 italic">
                  Página {pageNumber} de {totalPages}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};