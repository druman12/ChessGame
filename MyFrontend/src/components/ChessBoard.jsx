import { useState, useEffect, useCallback } from "react";
import { MOVE } from "../screens/Game";
import PromotionPopup from "./PromotionPopup";

export default function ChessBoard(props) {
    const [from, setFrom] = useState(null);
    const [promotionMove, setPromotionMove] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    
    const reversedBoard = props.playerColor === "black" ? [...props.board].reverse().map(row => [...row].reverse()) : props.board;

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.chess-board')) {
                props.setSelectedSquare(null);
                setFrom(null);
                setPossibleMoves([]);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [props.setSelectedSquare]);

    // Calculate possible moves when a piece is selected
    useEffect(() => {
        if (from && props.isYourTurn) {
            const moves = props.chess.moves({ square: from, verbose: true });
            setPossibleMoves(moves.map((move) => move.to));
        } else {
            setPossibleMoves([]);
        }
    }, [from, props.chess, props.isYourTurn]);

    const handleSquareClick = useCallback((squareRepresentation) => {
        if (!props.isYourTurn) return;

        props.setSelectedSquare(squareRepresentation);

        if (!from) {
            const piece = props.chess.get(squareRepresentation);
            if (piece && piece.color === (props.playerColor === 'white' ? 'w' : 'b')) {
                setFrom(squareRepresentation);
            }
        } else {
            if (from === squareRepresentation) {
                setFrom(null);
                setPossibleMoves([]);
            } else {
                const move = {
                    from,
                    to: squareRepresentation
                };

                try {
                    const piece = props.chess.get(from);
                    const isPromotion = piece && piece.type === 'p' && (squareRepresentation[1] === '8' || squareRepresentation[1] === '1');

                    if (isPromotion) {
                        setPromotionMove(move);
                    } else {
                        const chessMove = props.chess.move(move);
                        if (chessMove) {
                            props.socket.send(JSON.stringify({
                                type: MOVE,
                                payload: {
                                    move: move
                                }
                            }));
                            setFrom(null);
                            props.setBoard(props.chess.board());
                            props.setSelectedSquare(null);
                            setPossibleMoves([]);
                        } else {
                            const newPiece = props.chess.get(squareRepresentation);
                            if (newPiece && newPiece.color === (props.playerColor === 'white' ? 'w' : 'b')) {
                                setFrom(squareRepresentation);
                            } else {
                                setFrom(null);
                                setPossibleMoves([]);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error making move:", error);
                    setFrom(null);
                    props.setSelectedSquare(null);
                    setPossibleMoves([]);
                }
            }
        }
    }, [from, props.isYourTurn, props.chess, props.socket, props.setBoard, props.setSelectedSquare, props.playerColor]);

    const handlePromotion = useCallback((promotionPiece) => {
        if (promotionMove) {
            const move = { ...promotionMove, promotion: promotionPiece };
            const chessMove = props.chess.move(move);
            if (chessMove) {
                props.socket.send(JSON.stringify({
                    type: MOVE,
                    payload: {
                        move: move
                    }
                }));
                props.setBoard(props.chess.board());
            }
            setPromotionMove(null);
            setFrom(null);
            props.setSelectedSquare(null);
            setPossibleMoves([]);
        }
    }, [props.chess, promotionMove, props.setBoard, props.socket]);

    const closePromotionPopup = useCallback(() => {
        setPromotionMove(null);
        setFrom(null);
        props.setSelectedSquare(null);
        setPossibleMoves([]);
    }, [props.setSelectedSquare]);

    const getSquareClasses = (i, j, squareRepresentation) => {
        const isLight = (i + j) % 2 === 0;
        const isSelected = props.selectedSquare === squareRepresentation;
        const isFrom = from === squareRepresentation;
        const isPossibleMove = possibleMoves.includes(squareRepresentation);
        
        let classes = "w-16 h-16 sm:w-20 sm:h-20 relative transition-all duration-200 ";
        
        if (isSelected || isFrom) {
            classes += "bg-yellow-400 shadow-lg ";
        } else if (isPossibleMove) {
            classes += isLight ? "bg-emerald-300 " : "bg-emerald-400 ";
        } else {
            classes += isLight ? "bg-amber-100 " : "bg-amber-800 ";
        }
        
        if (!props.isYourTurn) {
            classes += "cursor-not-allowed opacity-75 ";
        } else {
            classes += "cursor-pointer hover:brightness-110 ";
        }
        
        return classes;
    };

    return (
        <div className="chess-board relative">
            {/* Coordinate labels */}
            <div className="flex">
                <div className="w-8"></div>
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="w-16 sm:w-20 text-center text-slate-400 text-sm font-medium">
                        {String.fromCharCode(97 + (props.playerColor === "black" ? 7 - i : i))}
                    </div>
                ))}
            </div>
            
            <div className="flex">
                <div className="flex flex-col">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="w-8 h-16 sm:h-20 flex items-center justify-center text-slate-400 text-sm font-medium">
                            {props.playerColor === "black" ? i + 1 : 8 - i}
                        </div>
                    ))}
                </div>
                
                <div className="border-2 border-slate-600 rounded-lg overflow-hidden shadow-2xl">
                    {reversedBoard.map((row, i) => (
                        <div key={i} className="flex">
                            {row.map((square, j) => {
                                const file = props.playerColor === "black" ? 7 - j : j;
                                const rank = props.playerColor === "black" ? i : 7 - i;
                                const squareRepresentation = String.fromCharCode(97 + file) + (rank + 1);
                                const isPossibleMove = possibleMoves.includes(squareRepresentation);

                                return (
                                    <div 
                                        key={j} 
                                        onClick={() => handleSquareClick(squareRepresentation)} 
                                        className={getSquareClasses(i, j, squareRepresentation)}
                                    >
                                        {/* Possible move indicator */}
                                        {isPossibleMove && !square && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-4 h-4 bg-emerald-600 rounded-full opacity-70"></div>
                                            </div>
                                        )}
                                        
                                        {/* Capture indicator */}
                                        {isPossibleMove && square && (
                                            <div className="absolute inset-0 border-4 border-red-500 rounded-full opacity-70"></div>
                                        )}
                                        
                                        {/* Piece */}
                                        <div className="w-full h-full flex items-center justify-center relative z-10">
                                            {square && (
                                                <img 
                                                    className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg" 
                                                    src={`/${square?.color === "b" ?
                                                        square?.type: `${square?.type?.toUpperCase()} copy`}.png`} 
                                                    alt={`${square.color} ${square.type}`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            
            {promotionMove && (
                <PromotionPopup
                    onSelect={handlePromotion}
                    onClose={closePromotionPopup}
                />
            )}
        </div>
    );
}