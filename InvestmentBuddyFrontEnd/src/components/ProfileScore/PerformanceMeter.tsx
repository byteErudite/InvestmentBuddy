import ReactSpeedometer from "react-d3-speedometer";

const PerformanceMeter = (props: { score: number }) => {
  return (
    <div>
      <ReactSpeedometer
        minValue={0}
        maxValue={100}
        needleHeightRatio={0.8}
        ringWidth={30}
        segments={5}
        value={props.score}
        segmentColors={[
          "#b81414",
          "#ec5555",
          "#f2db5b",
          "#7ab55c",
          "#385828",
        ]}
        needleColor="#000080"
        needleTransitionDuration={1000}
        height={161}
      />
    </div>
  )
}

export default PerformanceMeter;