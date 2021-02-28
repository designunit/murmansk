import { Section } from "../Section";
import s from "./index.module.css";
import { useMobile } from "../../hooks/useMobile";
import { Ratio } from "../Ratio";
import { Gradient } from "../Gradient";
import { Emoji } from "../Emoji";
import { useFluidFontSize } from "react-fluid-text";
import Image from "next/image";

export const Hero: React.FC = () => {
  const isMobile = useMobile();
  const [ref, fontSize] = useFluidFontSize({
    compressor: isMobile ? 0.45 : 0.25,
    maxFontSize: 145,
  });
  return (
    <>
      <section className={s.container}>
        <Section className={s.section}>
          <Ratio
            left={1}
            right={2}
            reverseMobile
            leftContent={
              !isMobile && (
                <div className={s.leftContainer}>
                  <Gradient />
                  <div className={s.imgContainer}>
                    <Image src="/static/hero.png" width={991} height={1023} />
                  </div>
                </div>
              )
            }
            spacer={
              !isMobile ? null : (
                <div
                  style={{
                    position: "relative",
                    top: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-10%",
                      width: "100vw",
                      borderBottom: "solid 1px black",
                    }}
                  />
                </div>
              )
            }
            rightContent={
              <>
                <h1
                  className={`${s.h1} ${isMobile && s.h1Mobile}`}
                  ref={ref}
                  style={{
                    fontSize,
                  }}
                >
                  <div>МУР</div>
                  <div>МУР</div>
                  <div>МУР</div>
                  <div>
                    МАНСК
                    <span>
                      <Image
                        src="/static/heroEmoji.png"
                        width={isMobile ? fontSize * 0.75 : 120}
                        height={isMobile ? fontSize * 0.75 : 120}
                        priority
                      />
                    </span>
                  </div>
                </h1>
              </>
            }
          />
        </Section>
        <div
          className={s.container}
          style={{
            borderTop: "solid 1px black",
          }}
        >
          <Section>
            <h2 className={s.h2}>
              // Дорогие Мурманчане, давайте чаще любоваться видами нашего
              города!
            </h2>
            <p>
              Проект МОЙЗАЛИВ.РФ направлен на&nbsp;то, чтобы превратить все
              городские территории ориентированные на&nbsp;залив
              в&nbsp;общественные пространства. Сейчас мы&nbsp;работаем над
              девятью тестовыми площадками, которые хотим реализовать уже этим
              летом.
            </p>
            <p>
              И&nbsp;мы&nbsp;хотим, чтобы вы&nbsp;помогли нам понять что именно
              там должно быть расположено. Поделитесь идеями, каким должен быть
              ваш вид на&nbsp;залив, чем вы&nbsp;хотите заниматься на&nbsp;новой
              площадке, какие функции должно выполнять благоустроенное
              пространство и&nbsp;для каких активностей приспособлено.
            </p>
            <p>
              Ниже интерактивная карта, где вы&nbsp;можете оставить свои
              пожелания.
              <span
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                <Emoji name="👇" />
                <Emoji name="❤️" />
                <Emoji name="👇" />
              </span>
            </p>
          </Section>
        </div>
      </section>
    </>
  );
};
