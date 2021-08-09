ccloud login
ccloud kafka topic list

$dir = Split-Path $MyInvocation.MyCommand.Path -Parent

foreach($topic in Get-Content $dir\control-center-topics.txt) {
  Write-Output $topic
  ccloud kafka topic delete $topic
}
ccloud kafka topic list