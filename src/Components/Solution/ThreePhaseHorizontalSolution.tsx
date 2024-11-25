import Latex from "react-latex";
import { Calculation } from "../../Services/CalculationService";
import { DataForThreePhaseVerticalCalculation } from "../Input/ThreePhaseVerticalInputPlate";

interface Props {
    inputData: DataForThreePhaseVerticalCalculation
}

const tableData= [60,72,84,96,108];

const ThreePhaseHorizontalSolution:React.FC<Props>  = ({inputData}) => {
    const SG = Calculation.SG(inputData.formInputs.Sgo);
    const deltaSG = Calculation.deltaSG(inputData.formInputs.Sgw, SG as number);
    const homax = Calculation.homax(inputData.formInputs.tro, deltaSG as number, inputData.formInputs.dropletWater,inputData.formInputs.muo);
    const AwA = Calculation.AwA(inputData.formInputs.Qw, inputData.formInputs.trw, inputData.formInputs.tro, inputData.formInputs.Qo);
    const beta  = Calculation.beta(AwA as number);
    const dmax = Calculation.dmax(homax as number, beta as number);

    const d2Leff = Calculation.d2LiquidLeff2(inputData.formInputs.Qw, inputData.formInputs.trw, inputData.formInputs.Qo, inputData.formInputs.tro);

    const rows = tableData.map(d => {
        const LeffL = (d2Leff as number) / d**2;
        const LssL = Calculation.LiquidLss(LeffL as number) as number;
        const SR = Calculation.SR(LssL, d);

        return { d, LeffL, LssL, SR };
    });

    const latex1_1 = `$$SG=\\frac{141.5}{131.5+API}$$`;
    const latex1_2 = `$$SG=\\frac{141.5}{131.5+${inputData.formInputs.Sgo}}$$`;
    const latex1_3 = `$$SG=${SG}$$`;

    const latex1_4 = `$$\\Delta SG=SG_w-SG$$`;
    const latex1_5 = `$$\\Delta SG=${inputData.formInputs.Sgw}-${SG}$$`;
    const latex1_6 = `$$\\Delta SG=${deltaSG}$$`;

    const latex2_1 = `$$(h_o)_{max}=(1.28*10^{-3})*\\frac{(t_r)_o*(\\Delta SG)*d_m^2}{μ_o}$$`;
    const latex2_2 = `$$(h_o)_{max}=(1.28*10^{-3})*\\frac{${inputData.formInputs.tro}*${deltaSG}*${inputData.formInputs.dropletWater}^2}{${inputData.formInputs.mu}}$$`;
    const latex2_3 = `$$(h_o)_{max}=${homax}$$`;
    
    const latex3_1 = `$$\\frac{A_w}{A}=0.5*\\frac{Q_w*(t_r)_w}{(t_r)*Q_o+(t_r)_w*Q_w}$$`;
    const latex3_2 = `$$\\frac{A_w}{A}=0.5*\\frac{${inputData.formInputs.Qw}*${inputData.formInputs.trw}}{${inputData.formInputs.tro}*${inputData.formInputs.Qo}+${inputData.formInputs.trw}*${inputData.formInputs.Qw}}$$`;
    const latex3_3 = `$$\\frac{A_w}{A}=${AwA}$$`;

    const latex4_1 = `$$\\beta  \\approx ${beta}$$`;

    const latex5_1 = `$$d_{max}=\\frac{(h_o)_{max}}{\\beta}$$`;
    const latex5_2 = `$$d_{max}=\\frac{${homax}}{${beta}}$$`;
    const latex5_3 = `$$d_{max}=${dmax}\\ in$$`;

    const latex6_1 = `$$d^2*L_{eff}=1.42*[Q_w*(t_r)_w+Q_o*(t_r)_o]$$`;
    const latex6_2 = `$$d^2*L_{eff}=1.42*[${inputData.formInputs.Qw}*${inputData.formInputs.trw}+${inputData.formInputs.Qo}*${inputData.formInputs.tro}]$$`;
    const latex6_3 = `$$d^2*L_{eff}=${d2Leff}$$`;

    return(
        <>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 1</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>
                        <Latex>{latex1_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_2}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex1_3}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_4}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_5}</Latex>
                    </div>
                    <div>
                        <Latex>{latex1_6}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 2</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>
                        <Latex>{latex2_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex2_2}</Latex>
                    </div>
                    <div>
                        <Latex>{latex2_3}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 3</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>
                        <Latex>{latex3_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex3_2}</Latex>
                    </div>
                    <div>
                        <Latex>{latex3_3}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 4</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <Latex>{latex4_1}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 5</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>    
                        <Latex>{latex5_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex5_2}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex5_3}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 6</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>    
                        <Latex>{latex6_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex6_2}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex6_3}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 7</h3>
            <table className="min-w-full bg-gray-50 border border-gray-400 text-center rounded-lg max-w-full shadow-md">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$d \\ (in)$$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$LeffL \\ (ft) $$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$LssL \\ (ft) $$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$SR\\ (12Lss/d)$$`}</Latex></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ d, LeffL, LssL, SR }, index) => {
                        const isHighlighted = (SR as number  >=1.5 && SR as number <= 3 && d <= (dmax as number));

                        return (
                            <tr key={index} className={isHighlighted ? 'bg-red-200' : ''}>
                                <td className="border border-gray-300 px-4 py-2">{d}</td>
                                <td className="border border-gray-300 px-4 py-2">{LeffL}</td>
                                <td className="border border-gray-300 px-4 py-2">{LssL}</td>
                                <td className="border border-gray-300 px-4 py-2">{SR}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ThreePhaseHorizontalSolution;