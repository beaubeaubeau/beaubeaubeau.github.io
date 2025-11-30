interface ControlsProps {
  onAutoFill: () => void;
  onClear: () => void;
  onLoadSamples: () => void;
  onEnableManual: () => void;
  manualMode: boolean;
}

function Controls({
  onAutoFill,
  onClear,
  onLoadSamples,
  onEnableManual,
  manualMode
}: ControlsProps) {
  return (
    <>
      <div className="mt-3">
        <button className="btn btn-success" onClick={onAutoFill}>
          Auto-Fill Bracket
        </button>
        <button className="btn btn-warning" onClick={onClear}>
          Clear Bracket
        </button>
        <button className="btn btn-info" onClick={onLoadSamples}>
          Load Sample Teams
        </button>
        <button className="btn btn-secondary" onClick={onEnableManual}>
          {manualMode ? 'Disable' : 'Enable'} Manual Selection
        </button>
      </div>
      {manualMode && (
        <div className="alert alert-info mt-3">
          <strong>Manual Mode:</strong> Click on teams in matchups to manually select winners. 
          Click "Auto-Fill Bracket" again to return to auto-predictions.
        </div>
      )}
    </>
  );
}

export default Controls;

