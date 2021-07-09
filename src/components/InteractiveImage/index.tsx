import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Emoji } from '../Emoji';
import { useSwipeable } from 'react-swipeable'
import { useMobile } from '@/hooks/useMobile'
import anim from './anim.module.css'

interface InteractiveImageProps {
    // src: string
}

const chainedFunction = (...funcs) => {
    return funcs
        .filter(func => (typeof func === 'function'))
        .reduce((accumulator, func) => {
            if (accumulator === null) {
                return func;
            }

            return function chainedFunction(...args) {
                accumulator.apply(this, args);
                func.apply(this, args);
            };
        }, null);
};

class Repeatable extends React.Component<any> {
    // static propTypes = {
    //     // A custom element for this component.
    //     tag: PropTypes.oneOfType([
    //         PropTypes.func,
    //         PropTypes.string,
    //         PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    //         PropTypes.arrayOf(PropTypes.oneOfType([
    //             PropTypes.func,
    //             PropTypes.string,
    //             PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    //         ]))
    //     ]),

    //     // Set it to true to disable event actions.
    //     disabled: PropTypes.bool,

    //     // The time (in milliseconds) to wait before the first hold action is being triggered.
    //     repeatDelay: PropTypes.oneOfType([
    //         PropTypes.number,
    //         PropTypes.string
    //     ]),

    //     // The time interval (in milliseconds) on how often to trigger a hold action.
    //     repeatInterval: PropTypes.oneOfType([
    //         PropTypes.number,
    //         PropTypes.string
    //     ]),

    //     // The number of times the hold action will take place. A zero value will disable the repeat counter.
    //     repeatCount: PropTypes.oneOfType([
    //         PropTypes.number,
    //         PropTypes.string
    //     ]),

    //     // Callback fired when the mousedown or touchstart event is triggered.
    //     onPress: PropTypes.func,

    //     // Callback fired once before the first hold action.
    //     onHoldStart: PropTypes.func,

    //     // Callback fired mutiple times while holding down.
    //     onHold: PropTypes.func,

    //     // Callback fired once after the last hold action.
    //     onHoldEnd: PropTypes.func,

    //     // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
    //     onRelease: PropTypes.func,

    //     onMouseDown: PropTypes.func,
    //     onTouchStart: PropTypes.func,
    //     onTouchCancel: PropTypes.func,
    //     onTouchEnd: PropTypes.func
    // };

    static defaultProps = {
        tag: 'div',
        disabled: false,
        repeatDelay: 500,
        repeatInterval: 32,
        repeatCount: 0
    };

    repeatDelayTimer = null;

    repeatIntervalTimer = null;

    repeatAmount = 0;

    acquireTimer = () => {
        const repeatDelay = Math.max(Number(this.props.repeatDelay) || 0, 0);
        const repeatInterval = Math.max(Number(this.props.repeatInterval) || 0, 0);
        const repeatCount = Math.max(Number(this.props.repeatCount) || 0, 0);

        this.repeatAmount = 0;
        this.releaseTimer();

        this.repeatDelayTimer = setTimeout(() => {
            if ((repeatCount > 0) && (this.repeatAmount >= repeatCount)) {
                return;
            }

            this.repeatAmount++;

            if (typeof this.props.onHoldStart === 'function') {
                this.props.onHoldStart();
            }
            if (typeof this.props.onHold === 'function') {
                this.props.onHold();
            }

            this.repeatIntervalTimer = setInterval(() => {
                if ((repeatCount > 0) && (this.repeatAmount >= repeatCount)) {
                    return;
                }

                this.repeatAmount++;

                if (typeof this.props.onHold === 'function') {
                    this.props.onHold();
                }
            }, repeatInterval);
        }, repeatDelay);
    };

    releaseTimer = () => {
        if (this.repeatDelayTimer) {
            clearTimeout(this.repeatDelayTimer);
            this.repeatDelayTimer = null;
        }
        if (this.repeatIntervalTimer) {
            clearInterval(this.repeatIntervalTimer);
            this.repeatIntervalTimer = null;
        }
    };

    handleRelease = (event) => {
        if (this.props.disabled) {
            return;
        }

        if (this.repeatAmount > 0) {
            if (typeof this.props.onHoldEnd === 'function') {
                this.props.onHoldEnd();
            }
        }

        this.repeatAmount = 0;
        this.releaseTimer();

        if (typeof this.props.onRelease === 'function') {
            this.props.onRelease(event);
        }
    };

    handlePress = (event) => {
        if (this.props.disabled) {
            return;
        }

        event.persist();

        const releaseOnce = (event) => {
            document.documentElement.removeEventListener('mouseup', releaseOnce);
            this.handleRelease(event);
        };
        document.documentElement.addEventListener('mouseup', releaseOnce);

        if (typeof this.props.onPress === 'function') {
            this.props.onPress(event);
        }

        this.acquireTimer();
    };

    componentWillUnmount() {
        this.repeatAmount = 0;
        this.releaseTimer();
    }

    render() {
        const {
            tag: Tag,
            repeatDelay, // eslint-disable-line
            repeatInterval, // eslint-disable-line
            repeatCount, // eslint-disable-line
            onPress, // eslint-disable-line
            onHoldStart, // eslint-disable-line
            onHold, // eslint-disable-line
            onHoldEnd, // eslint-disable-line
            onRelease, // eslint-disable-line
            onMouseDown,
            onTouchStart,
            onTouchCancel,
            onTouchEnd,
            ...props
        } = this.props;

        return (
            <Tag
                // role="presentation"
                {...props}
                onMouseDown={chainedFunction(
                    onMouseDown,
                    this.handlePress,
                )}
                onTouchStart={chainedFunction(
                    onTouchStart,
                    this.handlePress,
                )}
                onTouchCancel={chainedFunction(
                    onTouchCancel,
                    this.handleRelease,
                )}
                onTouchEnd={chainedFunction(
                    onTouchEnd,
                    this.handleRelease,
                )}
            />
        );
    }
}

export const InteractiveImage: React.FC<InteractiveImageProps> = () => {
    const bg = '/static/rupor/panorama.jpg'
    const fg = '/static/rupor/rupor.png'
    const speed = 5 // n% / sec
    const interval = 100 // 1000 = 1s

    const [state, setState] = useState(50)

    const onRight = useCallback((offset) => {
        setState(Math.min(state + (interval / 1000 * (offset ?? speed)), 100))
    }, [state])
    const onLeft = useCallback((offset) => {
        setState(Math.max(state + (interval / 1000 * (offset ?? -speed)), 0))
    }, [state])

    const { ref } = useSwipeable({
        onSwipedLeft: (e) => onRight(-e.deltaX),
        onSwipedRight: (e) => onLeft(-e.deltaX),
    })

    const isMobile = useMobile()

    const refImg = useRef(null)
    const [imgWIdth, setImgWIdth] = useState(0)
    useEffect(() => {
        setImgWIdth(
            (refImg.current as HTMLImageElement).clientWidth / 3979
        )
    }, [refImg.current])

    const [prefState, setPrefState] = useState(state)
    const [animate, setAnimate] = useState({
        play: false,
        direction: true
    })
    useEffect(() => {
        if (prefState !== state) {
            setAnimate({ play: true, direction: state - prefState > 0 })
        } else {
            setTimeout(() => {
                setAnimate({ ...animate, play: false })
            }, 250)
        }
        setPrefState(state)
    }, [prefState, state])

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                flexFlow: 'column',
                overflow: 'hidden',
            }}
        >
            <img
                ref={refImg}
                src={fg}
                style={{
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPositionX: `${state}%`,
                    transition: 'background .25s',
                }}
            />

            {/* HANDS */}
            <img
                className={animate.direction ? anim.leftToR : anim.leftToL}
                src='/static/rupor/hand_l.png'
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '87.5%',
                    left: '20.8%',
                    width: 2213 * imgWIdth,
                    height: 715 * imgWIdth,
                    transformOrigin: '33% 20%',
                    animationPlayState: animate.play ? 'running' : 'paused',
                }}
            />

            <img
                className={animate.direction ? anim.rightToR : anim.rightToL}
                src='/static/rupor/hand_r.png'
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '88.4%',
                    left: '21.7%',
                    width: 2213 * imgWIdth,
                    height: 715 * imgWIdth,
                    transformOrigin: '66% 20%',
                    animationPlayState: animate.play ? 'running' : 'paused',
                }}
            />

            {/* ARROWS */}
            <Repeatable
                repeatDelay={32}
                repeatInterval={interval}
                tag="div"
                onHold={onLeft}
                style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    cursor: 'pointer',
                    fontSize: 28,
                }}
            >
                <Emoji name='⬅️' style={{ pointerEvents: 'none' }} />
            </Repeatable>
            <Repeatable
                repeatDelay={32}
                repeatInterval={interval}
                tag="button"
                onHold={onRight}
                style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    cursor: 'pointer',
                    fontSize: 28,

                    border: 'none',
                    background: 'none',
                }}
            >
                <Emoji name='➡️' style={{ pointerEvents: 'none' }} />
            </Repeatable>
        </div>
    )
}
