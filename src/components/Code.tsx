const TOKEN_COLORS = {
	keyword: "text-purple-400",
	type: "text-yellow-300",
	property: "text-blue-300",
	string: "text-orange-300",
	boolean: "text-purple-400",
	comment: "text-slate-500",
	punctuation: "text-slate-300",
} as const;

type TokenType = keyof typeof TOKEN_COLORS;

export function Token({
	type,
	children,
}: {
	type: TokenType;
	children: React.ReactNode;
}) {
	return <span className={TOKEN_COLORS[type]}>{children}</span>;
}

export function CodeLine({
	indent = 0,
	children,
}: {
	indent?: number;
	children?: React.ReactNode;
}) {
	return (
		<div className="leading-relaxed whitespace-pre">
			<span style={{ display: "inline-block", width: `${indent * 1.5}rem` }} />
			{children}
		</div>
	);
}

export function CodeWindow({
	fileName,
	children,
	className = "",
}: {
	fileName: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`relative bg-slate-900 rounded-xl shadow-2xl p-6 border border-slate-700 ${className}`}
		>
			{/* Header da Janela */}
			<div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
				<div className="w-3 h-3 rounded-full bg-red-500"></div>
				<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
				<div className="w-3 h-3 rounded-full bg-green-500"></div>
				<span className="ml-2 text-xs text-slate-400 font-mono">
					{fileName}
				</span>
			</div>

			{/* Conteúdo do Código */}
			<div className="font-mono text-sm text-slate-300 overflow-x-auto">
				<code>{children}</code>
			</div>
		</div>
	);
}
